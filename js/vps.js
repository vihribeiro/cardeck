/* Modo VPS (iOS antigo): quando o app e aberto por http://IP:PORTA/#k=TOKEN, as consultas a servicos
   com certificado nao aceito pelo iOS 9 passam pelo servidor do VPS (lista fechada). */
(function () {
  var key = null;
  try {
    var m = location.hash.match(/k=([\w-]{16,})/);
    if (m) { localStorage.setItem('cardeck.vps', m[1]); if (history.replaceState) history.replaceState(null, '', location.pathname + location.search); }
    key = localStorage.getItem('cardeck.vps');
  } catch (e) {}
  if (!key || location.protocol !== 'http:') return;
  var base = location.origin + '/api/' + key;
  var MAP = [
    ['https://api.open-meteo.com/', 'om'], ['https://geocoding-api.open-meteo.com/', 'omgeo'],
    ['https://router.project-osrm.org/', 'osrm'], ['https://routing.openstreetmap.de/', 'osmr'],
    ['https://photon.komoot.io/', 'photon'], ['https://de1.api.radio-browser.info/', 'rb'],
    ['https://api.piped.private.coffee/', 'piped'], ['https://pipedapi.kavin.rocks/', 'piped2']
  ];
  window.CD_VPS = { base: base };
  var f = window.fetch;
  if (!f) return;
  window.fetch = function (u, o) {
    if (typeof u === 'string') for (var i = 0; i < MAP.length; i++) if (u.indexOf(MAP[i][0]) === 0) { u = base + '/p/' + MAP[i][1] + '/' + u.slice(MAP[i][0].length); break; }
    return f.call(window, u, o);
  };
})();
