/* CarDeck — painel de carro para iPad. JS puro, sem build. */
(function () {
  'use strict';

  /* ---------- utilidades ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ICONS = {"home": "<path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\"/><path d=\"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"/>","compass": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z\"/>","music": "<path d=\"M9 18V5l12-2v13\"/><circle cx=\"6\" cy=\"18\" r=\"3\"/><circle cx=\"18\" cy=\"16\" r=\"3\"/>","youtube": "<rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"4\"/><path d=\"m10 9 5 3-5 3z\" fill=\"currentColor\"/>","play": "<polygon points=\"6 3 20 12 6 21 6 3\" fill=\"currentColor\"/>","sliders": "<path d=\"M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4\"/>","globe": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\"/><path d=\"M2 12h20\"/>","moon": "<path d=\"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z\"/>","traffic": "<rect x=\"7\" y=\"2\" width=\"10\" height=\"20\" rx=\"3\"/><circle cx=\"12\" cy=\"7\" r=\"1.3\"/><circle cx=\"12\" cy=\"12\" r=\"1.3\"/><circle cx=\"12\" cy=\"17\" r=\"1.3\"/>","building": "<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2\"/><path d=\"M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01\"/>","locate": "<path d=\"M2 12h3M19 12h3M12 2v3M12 19v3\"/><circle cx=\"12\" cy=\"12\" r=\"7\"/><circle cx=\"12\" cy=\"12\" r=\"2\" fill=\"currentColor\"/>","maximize": "<path d=\"M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3\"/>","minimize": "<path d=\"M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3\"/>","star": "<polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"/>","star-fill": "<polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\" fill=\"currentColor\"/>","volume": "<polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"/><path d=\"M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14\"/>","volume-x": "<polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"/><path d=\"m22 9-6 6M16 9l6 6\"/>","radio": "<path d=\"M4.9 19.1C1 15.2 1 8.8 4.9 4.9M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5M19.1 4.9C23 8.8 23 15.1 19.1 19\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/>","search": "<circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/>","pin": "<path d=\"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/>","arrow-up": "<path d=\"m5 12 7-7 7 7M12 19V5\"/>","arrow-left": "<path d=\"m12 19-7-7 7-7M19 12H5\"/>","arrow-right": "<path d=\"M5 12h14m-7-7 7 7-7 7\"/>","up-left": "<path d=\"M17 17V7H7M17 7 7 17\"/>","up-right": "<path d=\"M7 7h10v10M7 17 17 7\"/>","corner-left": "<path d=\"M9 14 4 9l5-5\"/><path d=\"M20 20v-7a4 4 0 0 0-4-4H4\"/>","corner-right": "<path d=\"m15 14 5-5-5-5\"/><path d=\"M4 20v-7a4 4 0 0 1 4-4h12\"/>","uturn": "<path d=\"M9 14 4 9l5-5\"/><path d=\"M4 9h10.5a5.5 5.5 0 0 1 0 11H11\"/>","flag": "<path d=\"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7\"/>","round": "<path d=\"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8\"/><path d=\"M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16M8 16H3v5\"/>","alert": "<path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4M12 17h.01\"/>","x": "<path d=\"M18 6 6 18M6 6l12 12\"/>","sun": "<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2M12 20v2m-7.07-17.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41\"/>","cloud": "<path d=\"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z\"/>","rain": "<path d=\"M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2M16 14v6M8 14v6M12 16v6\"/>","storm": "<path d=\"M6 16.3A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.97M13 12l-3 5h4l-3 5\"/>","fog": "<path d=\"M4 14.9A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.24M16 17H7M17 21H9\"/>","wifi-off": "<path d=\"m2 2 20 20M8.5 16.5a5 5 0 0 1 7 0M2 8.8a15 15 0 0 1 4.2-2.6M10.7 5.1A15 15 0 0 1 22 8.8M5 12.9a10 10 0 0 1 5.2-2.8M14 10.3a10 10 0 0 1 5 2.6M12 20h.01\"/>"};
  function ic(n) { return '<svg class="ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[n] || '') + '</svg>'; }
  ICONS.layout = '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>';
  ICONS.plus = '<path d="M5 12h14"/><path d="M12 5v14"/>';
  ICONS.check = '<path d="M20 6 9 17l-5-5"/>';
  ICONS.x = '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>';
  ICONS.reset = '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>';
  ICONS.move = '<path d="M12 2v20"/><path d="m15 19-3 3-3-3"/><path d="m19 9 3 3-3 3"/><path d="M2 12h20"/><path d="m5 9-3 3 3 3"/><path d="m9 5 3-3 3 3"/>';
  function setIc(el, n) { if (el) { el.dataset.ic = n; el.innerHTML = ic(n); } }
  function hydrateIcons() { $$('.ic').forEach(function (el) { el.innerHTML = ic(el.dataset.ic); }); }
  hydrateIcons();
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }
  function rand(n) { var a = 'abcdefghijkmnpqrstuvwxyz23456789', o = ''; for (var i = 0; i < n; i++) o += a[Math.floor(Math.random() * a.length)]; return o; }
  function getJSON(url, opts) {
    return fetch(url, opts).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
  }
  var toastTimer;
  function toast(msg, err, ms) {
    var t = $('#toast'); t.textContent = msg; t.className = 'toast' + (err ? ' err' : '');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.className = 'toast hidden'; }, ms || 3000);
  }

  /* ---------- estado persistente ---------- */
  var KEY = 'cardeck.v1';
  var S = { topic: 'cardeck-' + rand(10), locMode: null, city: '', cityCoords: null, nav: 'waze', voice: true, mph: false,
    favs: [], contacts: [], ytRecent: [], ytMode: 'embed' };
  try { var saved = JSON.parse(localStorage.getItem(KEY) || 'null'); if (saved) for (var k in saved) S[k] = saved[k]; } catch (e) {}
  if (S.ytMig !== 12) { S.ytMode = 'embed'; S.ytMig = 12; }  // versoes antigas gravavam 'app' (abre o YouTube)
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  save();

  /* ---------- navegação entre telas ---------- */
  var current = 'home';
  function show(v) {
    if (editing && v !== 'home') setEdit(false);
    if (v === 'map' && S.layout && !S.layout.map.on) { S.layout.map.on = true; applyLayout(); save(); }
    current = v;
    var vv = v === 'map' ? 'home' : v;
    $$('.view').forEach(function (el) { el.classList.toggle('on', el.id === 'v-' + vv); });
    $('#mapWrap').classList.toggle('full', v === 'map');
    setIc($('#btnExpand i'), v === 'map' ? 'minimize' : 'maximize');
    $$('#dock button[data-view]').forEach(function (b) { b.classList.toggle('on', b.dataset.view === v); });
    if (v === 'home' || v === 'map') { initMap(); setTimeout(function () { map.invalidate(); }, 80); }
    if (v === 'home') renderHomeYt();
    if (v === 'music') loadRadios();
    if (v === 'yt') { renderYtRecent(); renderYtAccount(); if (gValid() && !$('#ytItems').children.length) ytLoadTab(); }
    if (v === 'settings') renderSettings();
  }
  $$('#dock button[data-view]').forEach(function (b) { b.onclick = function () { show(b.dataset.view); }; });

  /* ---------- janelas da home (mover / redimensionar / remover / adicionar) ---------- */
  var WINS = {
    map: { id: 'mapWrap', label: 'Mapa', def: { x: 0, y: 0, w: 0.63, h: 1 } },
    music: { id: 'winMusic', label: 'Música', def: { x: 0.645, y: 0, w: 0.355, h: 0.42 } },
    yt: { id: 'winYt', label: 'YouTube', def: { x: 0.645, y: 0.435, w: 0.355, h: 0.565 } }
  };
  var winZ = 10, editing = false;
  function winDefault(k) { var d = WINS[k].def; return { x: d.x, y: d.y, w: d.w, h: d.h, on: true }; }
  S.layout = S.layout || {};
  Object.keys(WINS).forEach(function (k) { var l = S.layout[k]; if (!l || typeof l.x !== 'number') S.layout[k] = winDefault(k); });
  function place(k) {
    var l = S.layout[k], el = $('#' + WINS[k].id);
    el.classList.toggle('win-off', !l.on);
    el.style.left = (l.x * 100) + '%'; el.style.top = (l.y * 100) + '%';
    el.style.width = (l.w * 100) + '%'; el.style.height = (l.h * 100) + '%';
  }
  function renderTray() {
    var h = '';
    Object.keys(WINS).forEach(function (k) { if (!S.layout[k].on) h += '<button class="btn" data-add="' + k + '">' + ic('plus') + ' ' + WINS[k].label + '</button>'; });
    h += '<button class="btn" data-reset="1">' + ic('reset') + ' Padrão</button><button class="btn primary" data-done="1">' + ic('check') + ' Concluir</button>';
    $('#winTray').innerHTML = h;
  }
  function applyLayout() { Object.keys(WINS).forEach(place); renderTray(); }
  function setEdit(on) {
    if (on && current !== 'home') show('home');
    editing = on;
    document.body.classList.toggle('editing', on);
    $('#winTray').classList.toggle('hidden', !on);
    $('#dockEdit').classList.toggle('on', on);
    if (on) renderTray();
  }
  $('#dockEdit').onclick = function () { setEdit(!editing); };
  $('#winTray').onclick = function (e) {
    var b = e.target.closest ? e.target.closest('button') : null; if (!b) return;
    if (b.dataset.add) { var l = S.layout[b.dataset.add]; l.on = true; l.x = Math.min(l.x, 1 - l.w); l.y = Math.min(l.y, 1 - l.h); $('#' + WINS[b.dataset.add].id).style.zIndex = ++winZ; }
    else if (b.dataset.reset) { Object.keys(WINS).forEach(function (k) { S.layout[k] = winDefault(k); }); }
    else if (b.dataset.done) { setEdit(false); save(); return; }
    applyLayout(); save();
  };
  Object.keys(WINS).forEach(function (k) {
    var el = $('#' + WINS[k].id), c = document.createElement('div');
    c.className = 'winctl';
    c.innerHTML = '<span class="wl">' + ic('move') + ' ' + WINS[k].label + '</span><button class="wx" aria-label="Remover">' + ic('x') + '</button><div class="wrs"></div>';
    el.appendChild(c);
    c.querySelector('.wx').onclick = function (e) { e.stopPropagation(); S.layout[k].on = false; applyLayout(); save(); };
    c.addEventListener('pointerdown', function (e) {
      if (e.target.closest('.wx')) return;
      var rs = !!e.target.closest('.wrs'), l = S.layout[k], dr = $('.dash').getBoundingClientRect();
      if (!dr.width || !dr.height) return;
      var sx = e.clientX, sy = e.clientY, o = { x: l.x, y: l.y, w: l.w, h: l.h };
      el.style.zIndex = ++winZ;
      try { c.setPointerCapture(e.pointerId); } catch (x) {}
      e.preventDefault();
      function mv(ev) {
        var dx = (ev.clientX - sx) / dr.width, dy = (ev.clientY - sy) / dr.height;
        if (rs) { l.w = Math.min(1 - o.x, Math.max(0.18, o.w + dx)); l.h = Math.min(1 - o.y, Math.max(0.15, o.h + dy)); }
        else { l.x = Math.min(1 - o.w, Math.max(0, o.x + dx)); l.y = Math.min(1 - o.h, Math.max(0, o.y + dy)); }
        place(k);
      }
      function up() { c.removeEventListener('pointermove', mv); c.removeEventListener('pointerup', up); c.removeEventListener('pointercancel', up); save(); }
      c.addEventListener('pointermove', mv); c.addEventListener('pointerup', up); c.addEventListener('pointercancel', up);
    });
  });
  applyLayout();
  if (window.ResizeObserver) new ResizeObserver(function () { if (map) map.invalidate(); }).observe($('#mapWrap'));

  /* ---------- relógio, clima, rede ---------- */
  var DIAS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  var MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function tick() {
    var d = new Date(), h = d.getHours();
    $('#clock').textContent = pad(h) + ':' + pad(d.getMinutes());
    $('#greet').textContent = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
    $('#date').textContent = DIAS[d.getDay()] + ', ' + d.getDate() + ' de ' + MESES[d.getMonth()];
    $('#netStatus').textContent = navigator.onLine ? '● Online' : '○ Offline';
  }
  setInterval(tick, 1000); tick();
  window.addEventListener('online', tick); window.addEventListener('offline', tick);

  var WX = { 0: 'sun', 1: 'sun', 2: 'cloud', 3: 'cloud', 45: 'fog', 48: 'fog', 51: 'rain', 53: 'rain', 55: 'rain', 61: 'rain', 63: 'rain', 65: 'rain', 80: 'rain', 81: 'rain', 82: 'storm', 95: 'storm', 96: 'storm', 99: 'storm' };
  var lastWx = 0;
  function weather() {
    var c = loc ? { lat: loc.lat, lon: loc.lon } : S.cityCoords;
    if (!c || Date.now() - lastWx < 600000) return;
    lastWx = Date.now();
    getJSON('https://api.open-meteo.com/v1/forecast?latitude=' + c.lat + '&longitude=' + c.lon +
      '&current=temperature_2m,weather_code&temperature_unit=' + (S.mph ? 'fahrenheit' : 'celsius'))
      .then(function (j) {
        var cu = j.current;
        $('#wx').innerHTML = ic(WX[cu.weather_code] || 'cloud') + ' ' + Math.round(cu.temperature_2m) + '°' + (S.mph ? 'F' : 'C');
      }).catch(function () { lastWx = 0; });
  }
  function geocodeCity() {
    if (!S.city) return;
    getJSON('https://geocoding-api.open-meteo.com/v1/search?count=1&language=pt&name=' + encodeURIComponent(S.city))
      .then(function (j) {
        if (j.results && j.results[0]) { S.cityCoords = { lat: j.results[0].latitude, lon: j.results[0].longitude }; save(); lastWx = 0; weather(); }
      }).catch(function () {});
  }

  /* ---------- localização: GPS do iPad ou ponte ntfy com o iPhone ---------- */
  var loc = null, watchId = null, es = null, hdg = 0;
  function navBearing() { return NAV && NAV.active ? hdg : null; }
  function setLoc(lat, lon, src, heading, speed) {
    var prev = loc;
    loc = { lat: lat, lon: lon, src: src, t: Date.now(), heading: heading, speed: speed };
    var nh = null;
    if (typeof heading === 'number' && isFinite(heading) && speed > 1) nh = heading;
    else if (prev && dist([prev.lat, prev.lon], [lat, lon]) > 6) {
      var p1 = prev.lat * Math.PI / 180, p2 = lat * Math.PI / 180, dl = (lon - prev.lon) * Math.PI / 180;
      nh = (Math.atan2(Math.sin(dl) * Math.cos(p2), Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl)) * 180 / Math.PI + 360) % 360;
    }
    if (nh != null) { var df = ((nh - hdg + 540) % 360) - 180; hdg = (hdg + df * 0.6 + 360) % 360; }
    $('#locStatus').innerHTML = ic('pin') + ' ' + (src === 'gps' ? 'GPS do iPad' : 'Localização do iPhone');
    weather();
    updateMe(prev);
    if (NAV && NAV.active) navOnFix();
  }
  function startGps() {
    if (!navigator.geolocation || watchId != null) return;
    watchId = navigator.geolocation.watchPosition(function (p) {
      var c = p.coords;
      setLoc(c.latitude, c.longitude, 'gps', c.heading, c.speed);
    }, function (e) {
      $('#locStatus').textContent = 'Sem localização';
      toast('Permita a localização: Ajustes → Privacidade → Serviços de Localização → Safari.', true, 6000);
    }, { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 });
  }
  function stopGps() { if (watchId != null) { navigator.geolocation.clearWatch(watchId); watchId = null; } }
  function subscribe() {
    if (es) { es.close(); es = null; }
    if (!window.EventSource) return;
    es = new EventSource('https://ntfy.sh/' + encodeURIComponent(S.topic + '-ipad') + '/sse?since=2m');
    es.onmessage = function (ev) {
      try {
        var m = JSON.parse(ev.data);
        if (m.event !== 'message') return;
        var g = String(m.message || '').match(/^loc:\s*(-?[\d.,]+)\s*[|;\s]\s*(-?[\d.,]+)/i);
        if (g) setLoc(parseFloat(g[1].replace(',', '.')), parseFloat(g[2].replace(',', '.')), 'iphone');
      } catch (e) {}
    };
  }
  function applyLocMode() {
    stopGps(); if (es) { es.close(); es = null; }
    if (S.locMode === 'gps') startGps();
    else if (S.locMode === 'iphone') subscribe();
  }

  /* ---------- mapa (Leaflet/OSM sem chave; Mapbox GL com token: satélite, trânsito e prédios 3D) ---------- */
  var map = null, follow = false, meSet = false;
  function dflt() { return loc ? [loc.lat, loc.lon] : (S.cityCoords ? [S.cityCoords.lat, S.cityCoords.lon] : [-23.55, -46.63]); }

  function leafletMap(onClick, onDrag) {
    var m = L.map('map', { zoomControl: false, attributionControl: true }).setView(dflt(), 14), me = null, sel = null, route = null;
    // OSM padrão com filtro CSS para o visual escuro (a CARTO passou a exigir chave de API).
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, className: 'tiles-dark', attribution: '© OpenStreetMap' }).addTo(m);
    m.on('click', function (e) { onClick(e.latlng.lat, e.latlng.lng); });
    m.on('dragstart', onDrag);
    return {
      kind: 'leaflet',
      setView: function (lat, lon, z) { m.setView([lat, lon], z == null ? m.getZoom() : z, { animate: true }); },
      getZoom: function () { return m.getZoom(); },
      invalidate: function () { m.invalidateSize(); },
      setMe: function (lat, lon, h) {
        if (!me) me = L.marker([lat, lon], { icon: L.divIcon({ className: '', html: '<div class="car"></div>', iconSize: [30, 30] }), interactive: false }).addTo(m);
        else me.setLatLng([lat, lon]);
        var c = me.getElement() && me.getElement().firstChild; if (c) c.style.transform = 'rotate(' + h + 'deg)';
      },
      setSel: function (lat, lon) { if (sel) m.removeLayer(sel); sel = L.marker([lat, lon]).addTo(m); },
      clearSel: function () { if (sel) { m.removeLayer(sel); sel = null; } },
      setRoute: function (pts) { if (route) m.removeLayer(route); route = L.polyline(pts, { color: '#3b82f6', weight: 7, opacity: .9 }).addTo(m); },
      clearRoute: function () { if (route) { m.removeLayer(route); route = null; } },
      fit: function () { if (route) m.fitBounds(route.getBounds(), { padding: [60, 60] }); }
    };
  }

  var MB_STYLES = { dark: 'mapbox://styles/mapbox/dark-v11', sat: 'mapbox://styles/mapbox/satellite-streets-v12' };
  function mapboxMap(token, onClick, onDrag) {
    mapboxgl.accessToken = token;
    var c = dflt(), me = null, sel = null, routePts = null, warned = false;
    var st = { style: S.mbStyle === 'sat' ? 'sat' : 'dark', traffic: S.mbTraffic !== false, d3: S.mb3d !== false };
    var m = new mapboxgl.Map({ container: 'map', style: MB_STYLES[st.style], center: [c[1], c[0]], zoom: 14, pitch: st.d3 ? 50 : 0, attributionControl: true });
    function sync() {
      if (!m.isStyleLoaded()) return;
      var firstLabel; (m.getStyle().layers || []).some(function (l) { if (l.type === 'symbol' && l.layout && l.layout['text-field']) { firstLabel = l.id; return true; } });
      if (st.traffic) {
        if (!m.getSource('mbtraffic')) m.addSource('mbtraffic', { type: 'vector', url: 'mapbox://mapbox.mapbox-traffic-v1' });
        if (!m.getLayer('traffic')) m.addLayer({ id: 'traffic', type: 'line', source: 'mbtraffic', 'source-layer': 'traffic', minzoom: 6,
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: { 'line-width': ['interpolate', ['linear'], ['zoom'], 10, 1.5, 16, 6], 'line-color': ['match', ['get', 'congestion'], 'low', '#22c55e', 'moderate', '#f59e0b', 'heavy', '#ef4444', 'severe', '#991b1b', '#22c55e'] } }, firstLabel);
      } else if (m.getLayer('traffic')) m.removeLayer('traffic');
      if (st.d3) {
        if (!m.getLayer('bld3d') && m.getSource('composite')) m.addLayer({ id: 'bld3d', type: 'fill-extrusion', source: 'composite', 'source-layer': 'building', filter: ['==', 'extrude', 'true'], minzoom: 14,
          paint: { 'fill-extrusion-color': st.style === 'sat' ? '#b8bcc4' : '#3a4356', 'fill-extrusion-height': ['get', 'height'], 'fill-extrusion-base': ['get', 'min_height'], 'fill-extrusion-opacity': .82 } }, firstLabel);
      } else if (m.getLayer('bld3d')) m.removeLayer('bld3d');
      drawRoute();
    }
    function drawRoute() {
      if (!m.isStyleLoaded()) return;
      var data = { type: 'Feature', geometry: { type: 'LineString', coordinates: (routePts || []).map(function (p) { return [p[1], p[0]]; }) } };
      if (m.getSource('route')) m.getSource('route').setData(data);
      else if (routePts) {
        m.addSource('route', { type: 'geojson', data: data });
        m.addLayer({ id: 'route-casing', type: 'line', source: 'route', layout: { 'line-join': 'round', 'line-cap': 'round' }, paint: { 'line-color': '#0b1b3a', 'line-width': 11, 'line-opacity': .8 } });
        m.addLayer({ id: 'route', type: 'line', source: 'route', layout: { 'line-join': 'round', 'line-cap': 'round' }, paint: { 'line-color': '#3b82f6', 'line-width': 7 } });
      }
    }
    m.on('style.load', sync);
    m.on('click', function (e) { onClick(e.lngLat.lat, e.lngLat.lng); });
    m.on('dragstart', onDrag);
    m.on('error', function (e) {
      var s = e && e.error && e.error.status;
      if ((s === 401 || s === 403) && !warned) { warned = true; toast('Token do Mapbox inválido ou sem permissão. Confira em Ajustes.', true); }
    });
    return {
      kind: 'mapbox', st: st,
      setView: function (lat, lon, z, b) { var o = { center: [lon, lat], zoom: z == null ? m.getZoom() : z, duration: 600 }; if (b != null) { o.bearing = b; o.duration = 900; o.offset = [0, 140]; } m.easeTo(o); },
      resetBearing: function () { m.easeTo({ bearing: 0, offset: [0, 0], duration: 600 }); },
      getZoom: function () { return m.getZoom(); },
      invalidate: function () { m.resize(); },
      setMe: function (lat, lon, h) {
        if (!me) { var el = document.createElement('div'); el.className = 'car'; me = new mapboxgl.Marker({ element: el, rotationAlignment: 'map', pitchAlignment: 'map' }).setLngLat([lon, lat]).addTo(m); }
        else me.setLngLat([lon, lat]);
        me.setRotation(h);
      },
      setSel: function (lat, lon) { if (sel) sel.remove(); sel = new mapboxgl.Marker({ color: '#3b82f6' }).setLngLat([lon, lat]).addTo(m); },
      clearSel: function () { if (sel) { sel.remove(); sel = null; } },
      setRoute: function (pts) { routePts = pts; drawRoute(); },
      clearRoute: function () { routePts = null; if (m.getSource('route')) m.getSource('route').setData({ type: 'Feature', geometry: { type: 'LineString', coordinates: [] } }); },
      fit: function () {
        if (!routePts || !routePts.length) return;
        var b = new mapboxgl.LngLatBounds(); routePts.forEach(function (p) { b.extend([p[1], p[0]]); });
        m.fitBounds(b, { padding: 70, duration: 700 });
      },
      setStyle: function (n) { st.style = n; S.mbStyle = n; save(); m.setStyle(MB_STYLES[n]); },
      setTraffic: function (b) { st.traffic = b; S.mbTraffic = b; save(); sync(); },
      set3d: function (b) { st.d3 = b; S.mb3d = b; save(); m.easeTo({ pitch: b ? 50 : 0, duration: 600 }); sync(); }
    };
  }

  function onMapClick(lat, lon) { selectPlace({ lat: lat, lon: lon, name: 'Local marcado' }, true); }
  function onMapDrag() { follow = false; $('#recenter').classList.remove('hidden'); }
  function initMap() {
    if (map) return;
    if (S.mbToken && window.mapboxgl) { try { map = mapboxMap(S.mbToken, onMapClick, onMapDrag); } catch (e) { map = null; } }
    if (!map) map = leafletMap(onMapClick, onMapDrag);
    renderMapCtl();
    if (loc) updateMe(null);
  }
  function renderMapCtl() {
    var box = $('#mapctl'), mb = map && map.kind === 'mapbox';
    box.classList.toggle('hidden', !mb); if (!mb) return;
    box.querySelector('[data-ctl=style]').innerHTML = ic(map.st.style === 'sat' ? 'moon' : 'globe');
    box.querySelector('[data-ctl=traffic]').classList.toggle('on', map.st.traffic);
    box.querySelector('[data-ctl=d3]').classList.toggle('on', map.st.d3);
  }
  $('#mapctl').onclick = function (e) {
    var b = e.target.closest('button'); if (!b || !map || map.kind !== 'mapbox') return;
    if (b.dataset.ctl === 'style') map.setStyle(map.st.style === 'sat' ? 'dark' : 'sat');
    else if (b.dataset.ctl === 'traffic') map.setTraffic(!map.st.traffic);
    else if (b.dataset.ctl === 'd3') map.set3d(!map.st.d3);
    renderMapCtl();
  };
  function updateMe(prev) {
    if (!map || !loc) return;
    map.setMe(loc.lat, loc.lon, hdg);
    if (!meSet) { meSet = true; map.setView(loc.lat, loc.lon, 15); }
    else if (follow) map.setView(loc.lat, loc.lon, null, navBearing());
  }
  $('#recenter').onclick = function () { if (loc && map) { follow = true; map.setView(loc.lat, loc.lon, Math.max(map.getZoom(), 16), navBearing()); } else toast('Sem localização ainda', true); };

  /* ---------- busca de lugares (Photon / OSM) ---------- */
  function search(q, box) {
    q = q.trim(); if (!q) return;
    box.innerHTML = '<div class="muted">Buscando…</div>';
    var u = 'https://photon.komoot.io/api/?limit=6&lang=default&q=' + encodeURIComponent(q);
    if (loc) u += '&lat=' + loc.lat + '&lon=' + loc.lon;
    getJSON(u).then(function (j) {
      var fs = j.features || [];
      if (!fs.length) { box.innerHTML = '<div class="muted">Nada encontrado.</div>'; return; }
      box.innerHTML = '';
      fs.forEach(function (f) {
        var p = f.properties, c = f.geometry.coordinates;
        var name = p.name || p.street || 'Local';
        var sub = [p.street && p.name ? p.street + (p.housenumber ? ', ' + p.housenumber : '') : '', p.district, p.city, p.state].filter(Boolean).join(' · ');
        var el = document.createElement('div'); el.className = 'res';
        el.innerHTML = '<b>' + esc(name) + '</b><span>' + esc(sub) + '</span>';
        el.onclick = function () { box.innerHTML = ''; show('map'); selectPlace({ lat: c[1], lon: c[0], name: name, sub: sub }, true); };
        box.appendChild(el);
      });
    }).catch(function () { box.innerHTML = '<div class="muted">Falha na busca. Verifique a internet.</div>'; });
  }
  $('#mapGo').onclick = function () { search($('#mapQ').value, $('#mapResults')); };
  $('#mapQ').addEventListener('keydown', function (e) { if (e.key === 'Enter') $('#mapGo').click(); });

  var sel = null;
  function isFav(p) { return S.favs.some(function (f) { return Math.abs(f.lat - p.lat) < 1e-5 && Math.abs(f.lon - p.lon) < 1e-5; }); }
  function selectPlace(p, fly) {
    initMap(); sel = p;
    map.setSel(p.lat, p.lon);
    if (fly) map.setView(p.lat, p.lon, 15);
    $('#placeName').textContent = p.name; $('#placeInfo').textContent = p.sub || (p.lat.toFixed(5) + ', ' + p.lon.toFixed(5));
    $('#btnFav').innerHTML = isFav(p) ? ic('star-fill') + ' Favorito' : ic('star') + ' Favoritar';
    $('#placePanel').classList.remove('hidden'); $('#mapResults').innerHTML = '';
  }
  $('#btnClosePlace').onclick = function () { $('#placePanel').classList.add('hidden'); map.clearSel(); };
  $('#btnFav').onclick = function () {
    if (!sel) return;
    if (isFav(sel)) S.favs = S.favs.filter(function (f) { return !(Math.abs(f.lat - sel.lat) < 1e-5 && Math.abs(f.lon - sel.lon) < 1e-5); });
    else S.favs.push({ name: sel.name, sub: sel.sub || '', lat: sel.lat, lon: sel.lon });
    save(); $('#btnFav').innerHTML = isFav(sel) ? ic('star-fill') + ' Favorito' : ic('star') + ' Favoritar'; renderFavs();
  };
  $('#btnPhone').onclick = function () {
    if (!sel) return;
    var ll = sel.lat + ',' + sel.lon, u;
    if (S.nav === 'google') u = 'https://www.google.com/maps/dir/?api=1&destination=' + ll + '&travelmode=driving';
    else if (S.nav === 'apple') u = 'https://maps.apple.com/?daddr=' + ll + '&dirflg=d';
    else u = 'https://waze.com/ul?ll=' + ll + '&navigate=yes';
    window.open(u, '_blank');
  };
  function renderFavs() {
    var box = $('#favs'); box.innerHTML = '';
    if (!S.favs.length) { box.innerHTML = '<div class="muted">Nenhum favorito ainda. Busque um lugar e toque em “Favoritar”.</div>'; return; }
    S.favs.forEach(function (f, i) {
      var el = document.createElement('div'); el.className = 'tile';
      el.innerHTML = '<b>' + ic('star-fill') + ' ' + esc(f.name) + '</b><span>' + esc(f.sub) + '</span>';
      el.onclick = function () { show('map'); selectPlace(f, true); };
      box.appendChild(el);
    });
  }

  /* ---------- rotas e navegação guiada (OSRM) ---------- */
  var NAV = null, muted = false;
  function decodePolyline(str) {
    var i = 0, lat = 0, lng = 0, out = [];
    while (i < str.length) {
      var b, sh = 0, r = 0;
      do { b = str.charCodeAt(i++) - 63; r |= (b & 31) << sh; sh += 5; } while (b >= 32);
      lat += (r & 1) ? ~(r >> 1) : (r >> 1);
      sh = 0; r = 0;
      do { b = str.charCodeAt(i++) - 63; r |= (b & 31) << sh; sh += 5; } while (b >= 32);
      lng += (r & 1) ? ~(r >> 1) : (r >> 1);
      out.push([lat / 1e5, lng / 1e5]);
    }
    return out;
  }
  function dist(a, b) { // metros (haversine)
    var R = 6371000, r = Math.PI / 180, dLat = (b[0] - a[0]) * r, dLon = (b[1] - a[1]) * r;
    var x = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * R * Math.asin(Math.sqrt(x));
  }
  function fmtDist(m) {
    if (S.mph) { var ft = m * 3.28084; return ft < 1000 ? Math.round(ft / 10) * 10 + ' ft' : (m / 1609.34).toFixed(1) + ' mi'; }
    return m < 1000 ? Math.round(m / 10) * 10 + ' m' : (m / 1000).toFixed(m < 10000 ? 1 : 0) + ' km';
  }
  function fetchRoute(from, to) {
    var path = from.lon.toFixed(6) + ',' + from.lat.toFixed(6) + ';' + to.lon.toFixed(6) + ',' + to.lat.toFixed(6);
    var q = '?overview=full&geometries=polyline&steps=true&alternatives=false';
    return getJSON('https://router.project-osrm.org/route/v1/driving/' + path + q)
      .catch(function () { return getJSON('https://routing.openstreetmap.de/routed-car/route/v1/driving/' + path + q); })
      .then(function (j) { if (!j || j.code !== 'Ok' || !j.routes.length) throw new Error('route'); return j.routes[0]; });
  }
  var ARROWS = { 'turn-left': ic('arrow-left'), 'turn-right': ic('arrow-right'), 'sharp left': ic('corner-left'), 'sharp right': ic('corner-right'), 'slight left': ic('up-left'), 'slight right': ic('up-right'), straight: ic('arrow-up'), uturn: ic('uturn'), arrive: ic('flag'), depart: ic('arrow-up') };
  function stepArrow(s) {
    var m = s.maneuver; if (m.type === 'arrive') return ARROWS.arrive;
    if (m.modifier === 'uturn') return ARROWS.uturn;
    if (m.type === 'roundabout' || m.type === 'rotary') return ic('round');
    if (m.modifier === 'left') return ARROWS['turn-left']; if (m.modifier === 'right') return ARROWS['turn-right'];
    return ARROWS[m.modifier] || ic('arrow-up');
  }
  function onde(nome) { // artigo correto para o nome da via
    if (!nome) return '';
    if (/^(Viaduto|Largo|T[úu]nel|Parque|Elevado|Complexo)\b/i.test(nome)) return ' no ' + nome;
    if (/^(Rua|Avenida|Pra[çc]a|Alameda|Travessa|Estrada|Rodovia|Ponte|Via|Marginal|Ladeira|Passarela)\b/i.test(nome)) return ' na ' + nome;
    return ' em ' + nome;
  }
  function stepText(s) {
    var m = s.maneuver, name = onde(s.name), mod = ({ left: 'à esquerda', right: 'à direita', 'slight left': 'levemente à esquerda', 'slight right': 'levemente à direita', 'sharp left': 'acentuado à esquerda', 'sharp right': 'acentuado à direita', straight: 'em frente', uturn: 'retorno' })[m.modifier] || '';
    if (m.type === 'arrive') return 'Você chegou ao destino';
    if (m.type === 'depart') return 'Siga' + (s.name ? ' pela ' + s.name : ' em frente');
    if (m.type === 'roundabout' || m.type === 'rotary') return 'Na rotatória, pegue a saída' + (m.exit ? ' ' + m.exit : '');
    if (m.type === 'merge') return 'Entre' + name;
    return ('Vire ' + mod + name).replace('Vire em frente', 'Siga em frente').replace('Vire retorno', 'Faça o retorno');
  }
  function speak(txt) {
    if (!S.voice || muted || !window.speechSynthesis) return;
    try { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(txt); u.lang = 'pt-BR'; speechSynthesis.speak(u); } catch (e) {}
  }
  $('#btnRoute').onclick = function () {
    if (!sel) return;
    if (!loc) { toast('Sem localização. Ative o GPS ou a ponte com o iPhone.', true, 4500); return; }
    var btn = $('#btnRoute'); btn.textContent = 'Calculando…';
    fetchRoute(loc, sel).then(function (r) {
      var steps = [].concat.apply([], r.legs.map(function (l) { return l.steps; }));
      var pts = decodePolyline(r.geometry);
      NAV = { active: false, route: r, steps: steps, pts: pts, si: 0, dest: sel, spoken: {}, offCount: 0 };
      map.setRoute(pts); map.fit();
      $('#placePanel').classList.add('hidden'); $('#navPanel').classList.remove('hidden');
      $('#btnStartNav').classList.remove('hidden');
      var dc = $('#destChip'); dc.textContent = sel.name || sel.sub || 'Destino'; dc.classList.remove('hidden');
      navRender();
    }).catch(function () { toast('Não foi possível traçar a rota.', true); })
      .then(function () { btn.textContent = 'Traçar rota'; });
  };
  $('#btnStartNav').onclick = function () {
    if (!NAV) return; NAV.active = true; follow = true;
    $('#btnStartNav').classList.add('hidden'); show('map');
    map.setView(loc.lat, loc.lon, 17, hdg); navRender();
    speak(stepText(NAV.steps[0]));
  };
  $('#btnMute').onclick = function () { muted = !muted; this.innerHTML = ic(muted ? 'volume-x' : 'volume'); if (muted && window.speechSynthesis) speechSynthesis.cancel(); };
  $('#btnEndNav').onclick = endNav;
  function endNav() {
    NAV = null; follow = false; map.clearRoute(); if (map.resetBearing) map.resetBearing();
    $('#navPanel').classList.add('hidden'); $('#destChip').classList.add('hidden'); if (window.speechSynthesis) speechSynthesis.cancel();
  }
  function nearest(lat, lon) { // índice do ponto mais próximo da rota
    var best = 0, bd = 1e12, p = [lat, lon];
    for (var i = 0; i < NAV.pts.length; i++) { var d = dist(p, NAV.pts[i]); if (d < bd) { bd = d; best = i; } }
    return { i: best, d: bd };
  }
  function navOnFix() {
    if (!NAV || !NAV.active || !loc || NAV.arrived) return;
    var n = nearest(loc.lat, loc.lon);
    if (n.d > 70) { // fora da rota
      if (++NAV.offCount >= 3) { NAV.offCount = 0; toast('Recalculando…'); speak('Recalculando');
        var dest = NAV.dest; fetchRoute(loc, dest).then(function (r) {
          NAV.route = r; NAV.steps = [].concat.apply([], r.legs.map(function (l) { return l.steps; }));
          NAV.pts = decodePolyline(r.geometry); NAV.si = 0; NAV.spoken = {};
          map.setRoute(NAV.pts);
          navRender();
        }).catch(function () {}); }
      return;
    }
    NAV.offCount = 0;
    // avança para o próximo passo quando está perto do ponto da manobra
    var s = NAV.steps[NAV.si + 1];
    while (s && dist([loc.lat, loc.lon], [s.maneuver.location[1], s.maneuver.location[0]]) < 25 && NAV.si < NAV.steps.length - 1) { NAV.si++; s = NAV.steps[NAV.si + 1]; }
    var nxt = NAV.steps[NAV.si + 1] || NAV.steps[NAV.si];
    var dm = dist([loc.lat, loc.lon], [nxt.maneuver.location[1], nxt.maneuver.location[0]]);
    // fala só o aviso mais próximo: avisos maiores que a distância atual são marcados sem falar
    var ths = [500, 150, 30], arrive = nxt.maneuver.type === 'arrive';
    for (var ti = 0; ti < ths.length; ti++) {
      var th = ths[ti], key = NAV.si + ':' + th;
      if (dm <= th && !NAV.spoken[key]) {
        var firstSeen = !NAV.spoken[NAV.si + ':any'];
        NAV.spoken[key] = 1;
        var smaller = ths.slice(ti + 1).some(function (t2) { return dm <= t2; });
        if (smaller) continue; // já está dentro de um aviso menor; fala só ele
        NAV.spoken[NAV.si + ':any'] = 1;
        speak((th > 30 && !arrive ? 'Em ' + (firstSeen && dm < th * 0.7 ? Math.round(dm / 10) * 10 : th) + ' metros, ' : '') + stepText(nxt));
      }
    }
    if (nxt.maneuver.type === 'arrive' && dm < 30) { NAV.arrived = true; toast('Você chegou!'); setTimeout(endNav, 4000); return; }
    navRender();
  }
  function navRender() {
    if (!NAV) return;
    var nxt = NAV.steps[NAV.si + 1] || NAV.steps[NAV.si];
    var dm = loc ? dist([loc.lat, loc.lon], [nxt.maneuver.location[1], nxt.maneuver.location[0]]) : nxt.distance;
    $('#navArrow').innerHTML = stepArrow(nxt); $('#navDist').textContent = fmtDist(dm); $('#navText').textContent = stepText(nxt);
    var remM = NAV.route.distance, remS = NAV.route.duration;
    if (loc) { var n = nearest(loc.lat, loc.lon), left = 0; for (var i = n.i; i < NAV.pts.length - 1; i++) left += dist(NAV.pts[i], NAV.pts[i + 1]); remS = NAV.route.duration * (left / NAV.route.distance); remM = left; }
    var eta = new Date(Date.now() + remS * 1000);
    $('#navEta').textContent = fmtDist(remM) + ' · ' + Math.max(1, Math.round(remS / 60)) + ' min · chegada ' + pad(eta.getHours()) + ':' + pad(eta.getMinutes());
  }

  /* ---------- música: rádios + player ---------- */
  var audio = $('#audio'), radios = [], radioMode = 'top', playingId = null, radioLoaded = false;
  var RCHIPS = [['top', 'Populares'], ['rock', 'Rock'], ['pop', 'Pop'], ['sertanejo', 'Sertanejo'], ['jazz', 'Jazz'], ['news', 'Notícias'], ['q:cultura', 'Cultura']];
  function radioSearch() { var q = $('#radioQ').value.trim(); if (!q) return; radioMode = 'q:' + q; radioLoaded = false; loadRadios(); }
  $('#radioGo').onclick = radioSearch;
  $('#radioQ').onkeydown = function (e) { if (e.key === 'Enter') radioSearch(); };
  function loadRadios() {
    var chips = $('#radioChips'); chips.innerHTML = '';
    RCHIPS.forEach(function (c) {
      var el = document.createElement('span'); el.className = 'chip' + (c[0] === radioMode ? ' on' : ''); el.textContent = c[1];
      el.onclick = function () { radioMode = c[0]; radioLoaded = false; loadRadios(); }; chips.appendChild(el);
    });
    if (radioLoaded) return;
    var box = $('#radioList'); box.innerHTML = '<div class="muted">Carregando…</div>';
    var u = 'https://de1.api.radio-browser.info/json/stations/search?countrycode=BR&hidebroken=true&order=clickcount&reverse=true&limit=40' +
      (radioMode === 'top' ? '' : radioMode.indexOf('q:') === 0 ? '&name=' + encodeURIComponent(radioMode.slice(2)) : '&tag=' + encodeURIComponent(radioMode));
    getJSON(u).then(function (list) {
      radios = list.filter(function (s) { return s.url_resolved && /^https:/.test(s.url_resolved); });
      radioLoaded = true; renderRadios();
      if (!radios.length) box.innerHTML = '<div class="muted">Nenhuma rádio encontrada.</div>';
    }).catch(function () { box.innerHTML = '<div class="muted">Não foi possível carregar as rádios.</div>'; });
  }
  function renderRadios() {
    var box = $('#radioList'); box.innerHTML = '';
    radios.forEach(function (s) {
      var el = document.createElement('div'); el.className = 'item' + (s.stationuuid === playingId ? ' playing' : '');
      var logo = s.favicon && /^https:/.test(s.favicon) ? '<img src="' + esc(s.favicon) + '" onerror="this.outerHTML=\'<div class=ph></div>\'">' : '<div class="ph"></div>';
      el.innerHTML = logo + '<div class="t"><b>' + esc(s.name.trim()) + '</b><span>' + esc([s.state, s.tags && s.tags.split(',')[0]].filter(Boolean).join(' · ')) + '</span></div>' + (s.stationuuid === playingId ? '<span class="np-ic">' + ic('play') + '</span>' : '');
      el.onclick = function () { playStation(s); }; box.appendChild(el);
    });
  }
  function playStation(s) {
    if (playingId === s.stationuuid) { audio.pause(); playingId = null; setNP(null); renderRadios(); return; }
    playingId = s.stationuuid; setNP(s); renderRadios();
    var urls = [s.url_resolved]; if (s.url && s.url !== s.url_resolved && /^https:/.test(s.url)) urls.push(s.url);
    var tryN = function (i, why) {
      if (playingId !== s.stationuuid) return;
      if (i >= urls.length) { playingId = null; setNP(null); renderRadios(); toast('Não foi possível tocar esta rádio' + (why ? ' (' + why + ')' : '') + '.', true); return; }
      var done = false, tm;
      var fail = function (w) { if (done) return; done = true; clearTimeout(tm); audio.onerror = null; audio.onplaying = null; tryN(i + 1, w); };
      audio.onerror = function () { fail('erro ' + (audio.error ? audio.error.code : '?')); };
      audio.onplaying = function () { done = true; clearTimeout(tm); $('#homeNP').innerHTML = npHtml(s, true); };
      $('#homeNP').innerHTML = npHtml(s, false);
      tm = setTimeout(function () { fail('sem resposta, rede ' + audio.networkState + '/estado ' + audio.readyState); }, 9000);
      audio.src = urls[i];
      var p = audio.play(); if (p && p.catch) p.catch(function (e) { if (e && e.name === 'AbortError') return; fail(e && e.name); });
    };
    tryN(0);
  }
  var VU_N = 5;
  $('#homeNP').addEventListener('click', function (e) {
    var v = e.target.closest ? e.target.closest('.vu') : null; if (!v) return;
    S.vuStyle = ((S.vuStyle | 0) + 1) % VU_N; v.dataset.s = S.vuStyle; save();
  });
  function npHtml(s, live) {
    var bars = '', i; for (i = 0; i < 14; i++) bars += '<i style="animation-delay:-' + (Math.random() * 1.2).toFixed(2) + 's;animation-duration:' + (0.5 + Math.random() * 0.7).toFixed(2) + 's"></i>';
    var logo = s.favicon && /^https:/.test(s.favicon) ? '<img src="' + esc(s.favicon) + '" onerror="this.style.display=\'none\'">' : '';
    return '<div class="np">' + logo + '<div class="npt"><b>' + esc(s.name.trim()) + '</b><span class="muted">' + (live ? 'ao vivo' : 'conectando…') + '</span></div><div class="vu' + (live ? ' on' : '') + '" data-s="' + ((S.vuStyle | 0) % VU_N) + '">' + bars + '</div></div>';
  }
  function setNP(s) {
    $('#homeNP').innerHTML = s ? npHtml(s, false) : 'Nada tocando';
    if ('mediaSession' in navigator && s) navigator.mediaSession.metadata = new MediaMetadata({ title: s.name.trim(), artist: 'Rádio ao vivo' });
  }

  /* ---------- YouTube (primeira parte: funciona com Premium) ---------- */
  function ytId(s) {
    var m = String(s).match(/(?:youtu\.be\/|[?&]v=|\/(?:shorts|live|embed|v|e)\/)([\w-]{11})/); return m ? m[1] : null;
  }
  function ytOpen(q) {
    q = q.trim(); if (!q) return;
    var id = ytId(q), url = id ? 'https://www.youtube.com/watch?v=' + id : /^https?:\/\//.test(q) ? q : 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);
    S.ytRecent = [{ q: q, url: url, t: Date.now() }].concat(S.ytRecent.filter(function (r) { return r.url !== url; })).slice(0, 10); save();
    renderYtRecent(); renderHomeYt(); playVideo(url);
  }
  $('#ytGo').onclick = function () { ytOpen($('#ytQ').value); };
  $('#ytQ').addEventListener('keydown', function (e) { if (e.key === 'Enter') ytOpen(this.value); });
  var playing = null;
  function playVideo(url) {
    var id = ytId(url), lm = !id && String(url).match(/[?&]list=([\w-]+)/); if (lm) id = 'list:' + lm[1];
    if (S.ytMode !== 'app' && id) {
      playing = id; if (current !== 'yt') show('home');
      var html = embedHtml(id) +
        '<div class="row"><a class="btn" href="' + esc(url) + '" target="_blank" rel="noopener">Abrir no YouTube</a><button class="btn closePl">Fechar</button></div>';
      var box = $('#homeYt'); box.onclick = null; box.innerHTML = html;
      $('#ytPlayer').innerHTML = html;
      mountApi(box); mountApi($('#ytPlayer'));
      $$('.closePl').forEach(function (b) { b.onclick = function (e) { e.stopPropagation(); playing = null; $('#ytPlayer').innerHTML = ''; renderHomeYt(); }; });
    } else if (!id) toast('Não reconheci esse link de vídeo: ' + String(url).slice(0, 60), true, 6000);
    else window.open(url, '_blank');
  }
  /* variantes do player: a = youtube-nocookie, b = youtube.com, c = IFrame API */
  function embedHtml(id) {
    var e = S.ytEmb || 'a', pl = id.indexOf('list:') === 0;
    if (pl && e === 'c') e = 'a';
    if (e === 'c') return '<div class="player"><div class="plhost" data-id="' + id + '"></div></div>';
    var host = e === 'b' ? 'www.youtube.com' : 'www.youtube-nocookie.com';
    return '<div class="player"><iframe src="https://' + host + '/embed/' + (pl ? 'videoseries' : id) + '?' + (pl ? 'list=' + id.slice(5) + '&' : '') + 'playsinline=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>';
  }
  var ytApiState = 0, ytApiQ = [];
  function mountApi(root) {
    var hs = root.querySelectorAll('.plhost'); if (!hs.length) return;
    var go = function () { Array.prototype.forEach.call(hs, function (h) { new YT.Player(h, { videoId: h.dataset.id, playerVars: { playsinline: 1, rel: 0, origin: location.origin } }); }); };
    if (ytApiState === 2) return go();
    ytApiQ.push(go);
    if (ytApiState === 0) {
      ytApiState = 1; window.onYouTubeIframeAPIReady = function () { ytApiState = 2; ytApiQ.forEach(function (f) { f(); }); ytApiQ = []; };
      var s = document.createElement('script'); s.src = 'https://www.youtube.com/iframe_api'; document.head.appendChild(s);
    }
  }
  function renderHomeYt() {
    if (playing) return;
    var box = $('#homeYt'), r = S.ytRecent.filter(function (x) { return ytId(x.url); })[0] || S.ytRecent[0], id = r && ytId(r.url);
    if (!r) { box.innerHTML = '<div class="muted">Busque um vídeo ou cole um link. Abre direto no YouTube (Premium, sem anúncios).</div>'; box.onclick = function () { show('yt'); }; return; }
    box.innerHTML = (id ? '<img src="https://i.ytimg.com/vi/' + id + '/hqdefault.jpg"><span class="playbtn">' + ic('play') + '</span>' : '<div class="yt-ph">' + ic('youtube') + '</div>') + '<b>' + esc(r.q) + '</b>';
    box.onclick = function () { playVideo(r.url); };
  }
  $('#goYt').onclick = function () { show('yt'); };
  $('#goRadio').onclick = function () { show('music'); };
  $('#btnExpand').onclick = function () { show(current === 'map' ? 'home' : 'map'); };
  function renderYtRecent() {
    var box = $('#ytRecent'); box.innerHTML = '';
    if (!S.ytRecent.length) { box.innerHTML = '<div class="muted">Nada ainda.</div>'; return; }
    S.ytRecent.forEach(function (r) {
      var id = ytId(r.url), el = document.createElement('div'); el.className = 'item';
      el.innerHTML = (id ? '<img src="https://i.ytimg.com/vi/' + id + '/default.jpg">' : '<div class="ph"></div>') + '<div class="t"><b>' + esc(r.q) + '</b><span>' + esc(r.url) + '</span></div>';
      el.onclick = function () { playVideo(r.url); }; box.appendChild(el);
    });
  }

  /* ---------- conta Google / YouTube (OAuth via Google Identity Services) ---------- */
  var G_SCOPE = 'https://www.googleapis.com/auth/youtube.readonly';
  var gisPromise = null, tokenClient = null, ytTab = 'playlists', ytStack = [];
  function gValid() { return S.gTok && S.gTok.exp > Date.now() + 30000; }
  function loadGis() {
    if (window.google && google.accounts && google.accounts.oauth2) return Promise.resolve();
    if (gisPromise) return gisPromise;
    gisPromise = new Promise(function (ok, fail) {
      var s = document.createElement('script'); s.src = 'https://accounts.google.com/gsi/client'; s.async = true;
      s.onload = ok; s.onerror = function () { gisPromise = null; fail(new Error('gis')); }; document.head.appendChild(s);
    });
    return gisPromise;
  }
  function gToken(interactive) { // devolve um token válido (pede ao Google se preciso)
    if (gValid()) return Promise.resolve(S.gTok.t);
    if (!S.gClientId) return Promise.reject(new Error('noid'));
    return loadGis().then(function () {
      return new Promise(function (ok, fail) {
        tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: S.gClientId, scope: G_SCOPE,
          callback: function (r) {
            if (r.error) { fail(new Error(r.error)); return; }
            S.gTok = { t: r.access_token, exp: Date.now() + (parseInt(r.expires_in, 10) || 3600) * 1000 }; save(); ok(r.access_token);
          },
          error_callback: function (e) { fail(new Error((e && e.type) || 'popup')); }
        });
        tokenClient.requestAccessToken({ prompt: interactive ? 'select_account' : '' });
      });
    });
  }
  function ytApi(path, params) {
    return gToken(false).then(function (tok) {
      var q = Object.keys(params).map(function (k) { return k + '=' + encodeURIComponent(params[k]); }).join('&');
      return fetch('https://www.googleapis.com/youtube/v3/' + path + '?' + q, { headers: { Authorization: 'Bearer ' + tok } }).then(function (r) {
        if (r.status === 401) { S.gTok = null; save(); renderYtAccount(); throw new Error('Sessão expirada. Entre de novo.'); }
        return r.json().then(function (j) { if (j.error) throw new Error(j.error.message || 'Erro da API do YouTube'); return j; });
      });
    });
  }
  function thumb(sn) { var t = sn.thumbnails || {}; return (t.medium || t.default || t.high || {}).url || ''; }
  function ytItem(o) {
    var el = document.createElement('div'); el.className = 'item';
    el.innerHTML = (o.img ? '<img src="' + esc(o.img) + '" loading="lazy">' : '<div class="ph"></div>') + '<div class="t"><b>' + esc(o.title) + '</b><span>' + esc(o.sub || '') + '</span></div>';
    el.onclick = o.fn; return el;
  }
  function openYt(url, label) {
    S.ytRecent = [{ q: label, url: url, t: Date.now() }].concat(S.ytRecent.filter(function (r) { return r.url !== url; })).slice(0, 10); save();
    renderYtRecent(); renderHomeYt(); playVideo(url);
  }
  function ytList(items, title, back) {
    var box = $('#ytItems'); box.innerHTML = ''; $('#ytTitle').textContent = title || '';
    $('#ytBack').classList.toggle('hidden', !back);
    if (!items.length) box.innerHTML = '<div class="muted">Nada por aqui.</div>';
    items.forEach(function (o) { box.appendChild(ytItem(o)); });
  }
  function ytLoading(msg) { $('#ytItems').innerHTML = '<div class="muted">' + esc(msg || 'Carregando…') + '</div>'; }
  function ytFail(e) { $('#ytItems').innerHTML = '<div class="muted">' + esc(e.message === 'noid' ? 'Configure o ID do cliente nos ajustes.' : e.message) + '</div>'; }
  function videoItem(v, listId) {
    var sn = v.snippet, id = (sn.resourceId && sn.resourceId.videoId) || (v.id && v.id.videoId) || v.id;
    return { img: thumb(sn), title: sn.title, sub: sn.videoOwnerChannelTitle || sn.channelTitle || '',
      fn: function () { openYt('https://www.youtube.com/watch?v=' + id + (listId ? '&list=' + listId : ''), sn.title); } };
  }
  function ytShowPlaylist(id, name) {
    ytStack.push(ytTab); ytLoading();
    ytApi('playlistItems', { part: 'snippet', playlistId: id, maxResults: 50 }).then(function (j) {
      ytList(j.items.filter(function (v) { return v.snippet.title !== 'Private video' && v.snippet.title !== 'Deleted video'; })
        .map(function (v) { return videoItem(v, id); }), name, true);
    }).catch(ytFail);
  }
  function ytLoadTab() {
    ytStack = []; ytLoading();
    if (ytTab === 'playlists') {
      ytApi('playlists', { part: 'snippet', mine: 'true', maxResults: 50 }).then(function (j) {
        ytList(j.items.map(function (p) { return { img: thumb(p.snippet), title: p.snippet.title, sub: 'Playlist', fn: function () { ytShowPlaylist(p.id, p.snippet.title); } }; }), 'Suas playlists');
      }).catch(ytFail);
    } else if (ytTab === 'liked') {
      ytApi('playlistItems', { part: 'snippet', playlistId: 'LL', maxResults: 50 }).then(function (j) {
        ytList(j.items.map(function (v) { return videoItem(v, 'LL'); }), 'Vídeos que você curtiu');
      }).catch(ytFail);
    } else if (ytTab === 'subs') {
      ytApi('subscriptions', { part: 'snippet', mine: 'true', maxResults: 50, order: 'alphabetical' }).then(function (j) {
        ytList(j.items.map(function (s) { var cid = s.snippet.resourceId.channelId;
          return { img: thumb(s.snippet), title: s.snippet.title, sub: 'Canal', fn: function () { openYt('https://www.youtube.com/channel/' + cid, s.snippet.title); } }; }), 'Suas inscrições');
      }).catch(ytFail);
    }
  }
  var YTTABS = [['playlists', 'Playlists'], ['liked', 'Curtidos'], ['subs', 'Inscrições']];
  function renderYtAccount() {
    var on = gValid();
    $('#ytLoginMsg').textContent = on ? 'Conectado. Toque em um vídeo para abrir no YouTube.' :
      (S.gClientId ? 'Entre com o Google para ver suas playlists, vídeos curtidos e inscrições.' : 'Primeiro configure o ID do cliente Google (veja Ajustes → Google / YouTube).');
    $('#ytSignIn').classList.toggle('hidden', on); $('#ytSignOut').classList.toggle('hidden', !on);
    $('#ytAccount').classList.toggle('hidden', !on);
    if (!on) return;
    var tabs = $('#ytTabs'); tabs.innerHTML = '';
    YTTABS.forEach(function (t) {
      var el = document.createElement('span'); el.className = 'chip' + (t[0] === ytTab ? ' on' : ''); el.textContent = t[1];
      el.onclick = function () { ytTab = t[0]; renderYtAccount(); ytLoadTab(); }; tabs.appendChild(el);
    });
  }
  $('#ytSignIn').onclick = function () {
    if (!S.gClientId) { show('settings'); toast('Cole o ID do cliente Google primeiro.', true); return; }
    gToken(true).then(function () { renderYtAccount(); ytLoadTab(); })
      .catch(function (e) { toast(e.message === 'gis' ? 'Não consegui carregar o login do Google.' : 'Login cancelado ou bloqueado (' + e.message + ').', true, 5000); });
  };
  $('#ytSignOut').onclick = function () {
    var t = S.gTok && S.gTok.t; S.gTok = null; save();
    if (t && window.google && google.accounts) try { google.accounts.oauth2.revoke(t, function () {}); } catch (e) {}
    renderYtAccount();
  };
  $('#ytSetup').onclick = function () { show('settings'); setTimeout(function () { var c = $('#googleCard'); if (c.scrollIntoView) c.scrollIntoView(); }, 50); };
  $('#ytBack').onclick = function () { ytTab = ytStack.pop() || ytTab; ytLoadTab(); };
  $('#gSave').onclick = function () {
    var v = $('#gClientId').value.trim();
    if (v && !/\.apps\.googleusercontent\.com$/.test(v)) { toast('O ID deve terminar com .apps.googleusercontent.com', true, 4500); return; }
    S.gClientId = v; S.gTok = null; save(); toast(v ? 'ID salvo.' : 'ID removido.');
  };
  // pesquisa na API quando conectado (a pesquisa por texto usa a cota da sua chave)
  var ytOpenBase = ytOpen;
  ytOpen = function (q) {
    q = q.trim();
    if (!q || ytId(q) || /^https?:\/\//.test(q) || !gValid()) { ytOpenBase(q); return; }
    $('#ytAccount').classList.remove('hidden'); ytLoading('Buscando…'); ytStack = [];
    ytApi('search', { part: 'snippet', type: 'video', maxResults: 20, q: q }).then(function (j) {
      ytList(j.items.map(function (v) { return videoItem(v); }), 'Resultados para “' + q + '”');
    }).catch(ytFail);
  };

  /* ---------- ajustes ---------- */
  function normPhone(p) { return String(p).replace(/\D/g, ''); }
  function renderContacts() {
    var box = $('#contacts'); box.innerHTML = '';
    S.contacts.forEach(function (c, i) {
      var el = document.createElement('div'); el.className = 'item';
      el.innerHTML = '<div class="t"><b>' + esc(c.name) + '</b><span>' + esc(c.phone) + '</span></div>' +
        '<a class="btn" href="tel:' + esc(normPhone(c.phone)) + '">Ligar</a> <a class="btn" target="_blank" href="https://wa.me/' + esc(normPhone(c.phone)) + '">WhatsApp</a> <button class="btn">' + ic('x') + '</button>';
      el.querySelector('button').onclick = function () { S.contacts.splice(i, 1); save(); renderContacts(); };
      box.appendChild(el);
    });
  }
  $('#ctAdd').onclick = function () {
    var n = $('#ctName').value.trim(), p = $('#ctPhone').value.trim();
    if (!n || normPhone(p).length < 8) { toast('Informe nome e telefone.', true); return; }
    S.contacts.push({ name: n, phone: p }); save(); $('#ctName').value = ''; $('#ctPhone').value = ''; renderContacts();
  };

  /* ---------- personalização: cores e logo da marca ---------- */
  var BGS = { escuro: ['#0b0d12', '#161a22', '#1e2430', '#2a3140', 'Escuro'], grafite: ['#15171a', '#202327', '#2a2e34', '#3a3f47', 'Grafite'],
    noite: ['#070b17', '#0f1830', '#16224a', '#233463', 'Azul-noite'], preto: ['#000000', '#0c0c0e', '#17171a', '#26262b', 'Preto'], vinho: ['#120a0d', '#1f1115', '#2b181e', '#42242d', 'Vinho'] };
  var ACCS = ['#3b82f6', '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#8b5cf6', '#ec4899', '#e5e7eb'];
  var BRANDS = [['audi', 'Audi', 'AUDI'], ['bmw', 'BMW', 'BMW'], ['byd', 'BYD', 'BYD'], ['chevrolet', 'Chevrolet', 'CHEV'], ['citroen', 'Citroën', 'C'], ['fiat', 'Fiat', 'FIAT'],
    ['ford', 'Ford', 'FORD'], ['honda', 'Honda', 'H'], ['hyundai', 'Hyundai', 'HY'], ['jeep', 'Jeep', 'JEEP'], ['kia', 'Kia', 'KIA'], ['mercedes', 'Mercedes-Benz', 'MB'],
    ['mitsubishi', 'Mitsubishi', 'MIT'], ['nissan', 'Nissan', 'NIS'], ['peugeot', 'Peugeot', 'PEU'], ['renault', 'Renault', 'REN'], ['tesla', 'Tesla', 'T'],
    ['toyota', 'Toyota', 'TOY'], ['volkswagen', 'Volkswagen', 'VW'], ['volvo', 'Volvo', 'VOL']];
  S.theme = S.theme || { acc: '#3b82f6', bg: 'escuro' }; S.brand = S.brand || { id: '', img: '' };
  function hexLum(h) { var n = parseInt(h.slice(1), 16), r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255; return (0.299 * r + 0.587 * g + 0.114 * b) / 255; }
  function hsl2hex(h, s, l) {
    s /= 100; l /= 100; var a = s * Math.min(l, 1 - l);
    function f(n) { var k = (n + h / 30) % 12, c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)); return ('0' + Math.round(255 * c).toString(16)).slice(-2); }
    return '#' + f(0) + f(8) + f(4);
  }
  function applyTheme() {
    var st = document.documentElement.style, t = S.theme, b = BGS[t.bg] || BGS.escuro;
    st.setProperty('--acc', t.acc); st.setProperty('--on', hexLum(t.acc) > 0.6 ? '#111' : '#fff');
    st.setProperty('--bg', b[0]); st.setProperty('--card', b[1]); st.setProperty('--card2', b[2]); st.setProperty('--line', 'color-mix(in srgb, ' + t.acc + ' 55%, ' + b[3] + ')'); st.setProperty('--dockbg', b[0]);
    var el = $('#brandLogo'), br = S.brand, h = '';
    if (br.img) h = '<img src="' + br.img + '" alt="">';
    else if (br.id) { var bb = BRANDS.filter(function (x) { return x[0] === br.id; })[0]; if (bb) h = '<span class="bmk l' + Math.min(bb[2].length, 4) + '">' + esc(bb[2]) + '</span>'; }
    el.innerHTML = h; el.classList.toggle('hidden', !h); $('#dock').classList.toggle('hasLogo', !!h);
  }
  function setAcc(hex) { S.theme.acc = hex; save(); applyTheme(); $('#accPick').value = hex; renderThemeUi(); }
  function renderThemeUi() {
    $('#accSw').innerHTML = ACCS.map(function (c) { return '<button class="sw' + (c === S.theme.acc ? ' on' : '') + '" data-c="' + c + '" style="background:' + c + '" aria-label="' + c + '"></button>'; }).join('');
    $('#bgChips').innerHTML = Object.keys(BGS).map(function (k) { return '<span class="chip' + (S.theme.bg === k ? ' on' : '') + '" data-bg="' + k + '">' + BGS[k][4] + '</span>'; }).join('');
    $('#accPick').value = S.theme.acc;
    var sel = $('#brandSel'); if (!sel.options.length) {
      sel.innerHTML = '<option value="">Nenhuma</option>' + BRANDS.map(function (b) { return '<option value="' + b[0] + '">' + b[1] + '</option>'; }).join('') + '<option value="custom" disabled>Minha logo (enviada)</option>';
    }
    sel.value = S.brand.img ? 'custom' : S.brand.id;
  }
  $('#accSw').onclick = function (e) { var b = e.target.closest ? e.target.closest('.sw') : null; if (b) setAcc(b.dataset.c); };
  $('#bgChips').onclick = function (e) { var b = e.target.closest ? e.target.closest('.chip') : null; if (b) { S.theme.bg = b.dataset.bg; save(); applyTheme(); renderThemeUi(); } };
  $('#accPick').oninput = function () { S.theme.acc = this.value; save(); applyTheme(); };
  $('#accPick').onchange = renderThemeUi;
  $('#accHue').oninput = function () { S.theme.acc = hsl2hex(+this.value, 85, 55); save(); applyTheme(); $('#accPick').value = S.theme.acc; };
  $('#accHue').onchange = renderThemeUi;
  $('#brandSel').onchange = function () { S.brand = { id: this.value, img: '' }; save(); applyTheme(); };
  $('#brandClear').onclick = function () { S.brand = { id: '', img: '' }; save(); applyTheme(); renderThemeUi(); };
  $('#brandFile').onchange = function () {
    var f = this.files && this.files[0]; if (!f) return; var self = this;
    var rd = new FileReader();
    rd.onload = function () {
      var im = new Image();
      im.onload = function () {
        var m = 160, k = Math.min(1, m / Math.max(im.width, im.height)), cv = document.createElement('canvas');
        cv.width = Math.max(1, Math.round(im.width * k)); cv.height = Math.max(1, Math.round(im.height * k));
        cv.getContext('2d').drawImage(im, 0, 0, cv.width, cv.height);
        S.brand = { id: 'custom', img: cv.toDataURL('image/png') }; save(); applyTheme(); renderThemeUi(); self.value = '';
      };
      im.onerror = function () { toast('Não consegui abrir essa imagem.', true); };
      im.src = rd.result;
    };
    rd.readAsDataURL(f);
  };
  applyTheme(); renderThemeUi();

  /* ---------- atualização do app ---------- */
  var APP_V = 24;
  function hardReload() {
    var done = function () { location.replace(location.pathname + '?r=' + Date.now()); };
    var p = [];
    if (navigator.serviceWorker && navigator.serviceWorker.getRegistrations) p.push(navigator.serviceWorker.getRegistrations().then(function (rs) { return Promise.all(rs.map(function (r) { return r.unregister(); })); }));
    if (window.caches) p.push(caches.keys().then(function (ks) { return Promise.all(ks.map(function (k) { return caches.delete(k); })); }));
    Promise.all(p).then(done, done);
  }
  $('#verInfo').textContent = 'versão v' + APP_V;
  $('#btnUpdate').onclick = hardReload;
  try {
    fetch('index.html?_=' + Date.now(), { cache: 'no-store' }).then(function (r) { return r.text(); }).then(function (t) {
      var m = t.match(/js\/app\.js\?v=(\d+)/);
      if (m && +m[1] > APP_V && sessionStorage.getItem('cd.upd') !== m[1]) { sessionStorage.setItem('cd.upd', m[1]); hardReload(); }
    }).catch(function () {});
  } catch (e) {}
  function renderSettings() {
    renderThemeUi();
    $$('input[name=locMode]').forEach(function (r) { r.checked = r.value === S.locMode; });
    $('#bridgeBox').classList.toggle('hidden', S.locMode !== 'iphone');
    $('#topicField').value = S.topic + '-ipad'; $('#topicIn').textContent = S.topic + '-ipad';
    $('#cityField').value = S.city; $('#navApp').value = S.nav; $('#voiceOn').checked = !!S.voice; $('#mph').checked = !!S.mph; $('#ytMode').value = S.ytMode; $('#mbToken').value = S.mbToken || '';
    $('#gClientId').value = S.gClientId || ''; $('#originCode').textContent = location.origin;
    renderContacts();
  }
  $$('input[name=locMode]').forEach(function (r) { r.onchange = function () { S.locMode = r.value; save(); applyLocMode(); renderSettings(); }; });
  $('#btnCopyTopic').onclick = function () { var f = $('#topicField'); f.select(); try { document.execCommand('copy'); toast('Copiado'); } catch (e) {} };
  $('#btnNewTopic').onclick = function () { S.topic = 'cardeck-' + rand(10); save(); applyLocMode(); renderSettings(); toast('Novo tópico gerado. Atualize o Atalho do iPhone.'); };
  $('#cityField').onchange = function () { S.city = this.value.trim(); save(); geocodeCity(); };
  $('#navApp').onchange = function () { S.nav = this.value; save(); };
  $('#mbSave').onclick = function () {
    var t = $('#mbToken').value.trim();
    if (t && t.indexOf('pk.') !== 0) { toast('O token público do Mapbox começa com pk.', true); return; }
    S.mbToken = t; save(); toast(t ? 'Token salvo. Recarregando…' : 'Token removido. Recarregando…'); setTimeout(function () { location.reload(); }, 700);
  };
  $('#ytMode').onchange = function () { S.ytMode = this.value; save(); };
  $('#voiceOn').onchange = function () { S.voice = this.checked; save(); };
  $('#mph').onchange = function () { S.mph = this.checked; lastWx = 0; save(); weather(); };

  /* ---------- onboarding e boot ---------- */
  $$('#onboard [data-mode]').forEach(function (b) {
    b.onclick = function () { S.locMode = b.dataset.mode; save(); $('#onboard').classList.add('hidden'); applyLocMode(); if (S.locMode === 'iphone') show('settings'); };
  });
  function boot() {
    renderFavs(); geocodeCity(); show('home');
    if (!S.locMode) $('#onboard').classList.remove('hidden'); else applyLocMode();
    if ('serviceWorker' in navigator && location.protocol === 'https:' || location.hostname === 'localhost') {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    }
  }
  boot();
})();
