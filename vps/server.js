/* CarDeck VPS: serve o app por HTTP, recebe a posicao do iPhone e faz proxy de uma lista fechada de servicos.
   Sem dependencias (Node 18+). Variaveis: TOKEN (obrigatorio, 16+ caracteres), PORT (8088), APP_DIR (/app). */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const TOKEN = process.env.TOKEN || '';
const PORT = parseInt(process.env.PORT || '8088', 10);
const APP_DIR = path.resolve(process.env.APP_DIR || '/app');
if (TOKEN.length < 16) { console.error('Defina TOKEN com 16+ caracteres'); process.exit(1); }

/* unicos destinos permitidos (somente GET) */
const UP = {
  om: 'https://api.open-meteo.com/',
  omgeo: 'https://geocoding-api.open-meteo.com/',
  osrm: 'https://router.project-osrm.org/',
  osmr: 'https://routing.openstreetmap.de/',
  photon: 'https://photon.komoot.io/',
  rb: 'https://de1.api.radio-browser.info/',
  piped: 'https://api.piped.private.coffee/',
  piped2: 'https://pipedapi.kavin.rocks/'
};
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.map': 'application/json' };

const tokBuf = Buffer.from(TOKEN);
function okToken(t) {
  const b = Buffer.from(String(t));
  return b.length === tokBuf.length && crypto.timingSafeEqual(b, tokBuf);
}

/* limite simples por IP: 240 requisicoes/min na API */
const hits = new Map();
setInterval(() => hits.clear(), 60000).unref();
function limited(ip) { const n = (hits.get(ip) || 0) + 1; hits.set(ip, n); return n > 240; }

let last = null; /* ultima posicao do iPhone: {lat, lon, t} */
function setLoc(lat, lon) {
  lat = parseFloat(lat); lon = parseFloat(lon);
  if (!(lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180)) return false;
  last = { lat, lon, t: Date.now() };
  return true;
}
function parseLocText(s) {
  const m = String(s).match(/(-?\d+(?:[.,]\d+)?)\s*[|;,\s]\s*(-?\d+(?:[.,]\d+)?)/);
  return m ? setLoc(m[1].replace(',', '.'), m[2].replace(',', '.')) : false;
}

function send(res, code, body, type, extra) {
  res.writeHead(code, Object.assign({ 'Content-Type': type || 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }, extra || {}));
  res.end(body);
}

async function proxy(svc, rest, res) {
  const base = UP[svc];
  if (!base) return send(res, 404, 'servico desconhecido');
  if (rest.indexOf('..') >= 0) return send(res, 400, 'caminho invalido');
  try {
    const r = await fetch(base + rest, { headers: { 'User-Agent': 'CarDeck-VPS/1.0', 'Accept': 'application/json' }, signal: AbortSignal.timeout(12000) });
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length > 3 * 1024 * 1024) return send(res, 502, 'resposta grande demais');
    send(res, r.status, buf, r.headers.get('content-type') || 'application/json');
  } catch (e) { send(res, 502, 'falha no servico'); }
}

function api(req, res, u, parts, ip) {
  if (limited(ip)) return send(res, 429, 'muitas requisicoes');
  if (!okToken(parts[1] || '')) return send(res, 403, 'token invalido');
  const what = parts[2];
  if (what === 'loc') {
    if (req.method === 'GET' && (u.searchParams.has('lat') || u.searchParams.has('loc'))) {
      const ok = u.searchParams.has('loc') ? parseLocText(u.searchParams.get('loc')) : setLoc(u.searchParams.get('lat'), u.searchParams.get('lon'));
      return send(res, ok ? 200 : 400, ok ? 'ok' : 'posicao invalida');
    }
    if (req.method === 'POST') {
      let b = ''; req.on('data', (c) => { if (b.length < 2000) b += c; });
      return req.on('end', () => {
        let ok = false;
        try { const j = JSON.parse(b); ok = setLoc(j.lat, j.lon); } catch (e) { ok = parseLocText(b); }
        send(res, ok ? 200 : 400, ok ? 'ok' : 'posicao invalida');
      });
    }
    return send(res, 200, JSON.stringify(last || {}), 'application/json');
  }
  if (what === 'p' && req.method === 'GET') {
    const rest = parts.slice(4).join('/') + u.search;
    return proxy(parts[3], rest, res);
  }
  send(res, 404, 'nao encontrado');
}

function serveStatic(req, res, u) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'metodo nao permitido');
  let p;
  try { p = decodeURIComponent(u.pathname); } catch (e) { return send(res, 400, 'url invalida'); }
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(APP_DIR, path.normalize(p));
  if (!f.startsWith(APP_DIR + path.sep)) return send(res, 403, 'negado');
  fs.stat(f, (err, st) => {
    if (err || !st.isFile()) return send(res, 404, 'nao encontrado');
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream', 'Content-Length': st.size, 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(f).pipe(res);
  });
}

http.createServer((req, res) => {
  const ip = req.socket.remoteAddress || '?';
  let u;
  try { u = new URL(req.url, 'http://x'); } catch (e) { return send(res, 400, 'url invalida'); }
  const parts = u.pathname.split('/').filter((x) => x !== '');
  if (parts[0] === 'api') return api(req, res, u, parts, ip);
  serveStatic(req, res, u);
}).listen(PORT, '0.0.0.0', () => console.log('CarDeck VPS na porta ' + PORT));
