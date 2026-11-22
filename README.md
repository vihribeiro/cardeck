# CarDeck

Painel de carro para iPad (PWA em JavaScript puro, sem build): mapa com navegação por voz, música, YouTube com login Google, clima e relógio.

## Rodar localmente

```bash
python3 -m http.server 8765
```

Abra http://localhost:8765. Para GPS, login Google e instalação como app no iPad, hospede em HTTPS (ex.: GitHub Pages).

## Configuração (em Ajustes, dentro do app)

Nada de chave fica no código; cada aparelho guarda as suas no `localStorage`.

- **Mapbox (opcional):** token público `pk.…` para satélite, trânsito e prédios 3D. Sem token, usa o mapa OpenStreetMap.
- **Google / YouTube (opcional):** ID do cliente OAuth (tipo "Aplicativo da Web") com o endereço do app em "Origens JavaScript autorizadas".

## Créditos

Leaflet, Mapbox GL JS, ícones estilo Lucide (ISC), OSRM, Photon, Open-Meteo, radio-browser.
