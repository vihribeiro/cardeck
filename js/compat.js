/* Compatibilidade com Safari antigo (iOS 9/10): fetch via XHR + aviso de erro na tela */
(function () {
  if (!window.fetch) {
    window.fetch = function (url, opts) {
      opts = opts || {};
      return new Promise(function (ok, fail) {
        var x = new XMLHttpRequest();
        x.open(opts.method || 'GET', url, true);
        var h = opts.headers || {}; Object.keys(h).forEach(function (k) { x.setRequestHeader(k, h[k]); });
        x.onload = function () {
          var t = x.responseText;
          ok({ ok: x.status >= 200 && x.status < 300, status: x.status,
            text: function () { return Promise.resolve(t); },
            json: function () { return new Promise(function (a, b) { try { a(JSON.parse(t)); } catch (e) { b(e); } }); } });
        };
        x.onerror = function () { fail(new TypeError('rede')); };
        x.ontimeout = x.onerror;
        if (opts.signal && opts.signal.addEventListener) opts.signal.addEventListener('abort', function () { x.abort(); fail(new TypeError('abortado')); });
        x.send(opts.body || null);
      });
    };
  }
  if (!Object.assign) Object.assign = function (t) { for (var i = 1; i < arguments.length; i++) { var s = arguments[i]; for (var k in s) if (Object.prototype.hasOwnProperty.call(s, k)) t[k] = s[k]; } return t; };
  if (!Element.prototype.closest) Element.prototype.closest = function (sel) {
    var e = this, m = e.matches || e.webkitMatchesSelector;
    while (e && e.nodeType === 1) { if (m.call(e, sel)) return e; e = e.parentNode; } return null;
  };
  /* mostra erros de JavaScript numa faixa no rodape (sem console no iPad antigo) */
  var errs = [];
  window.addEventListener('error', function (e) {
    var src = String(e.filename || '').split('/').pop();
    if (!src && !e.message) return;
    errs.push((e.message || 'erro') + ' (' + src + ':' + e.lineno + ')');
    var b = document.getElementById('errBar');
    if (!b) {
      b = document.createElement('div'); b.id = 'errBar';
      b.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:99999;background:#7a1020;color:#fff;font:12px/1.4 -apple-system,sans-serif;padding:6px 10px;max-height:30%;overflow:auto';
      b.onclick = function () { b.parentNode.removeChild(b); errs = []; };
      (document.body || document.documentElement).appendChild(b);
    }
    b.textContent = 'Erro (toque para fechar): ' + errs.slice(-3).join(' | ');
  });
})();
