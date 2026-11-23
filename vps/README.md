# CarDeck no VPS (para iPad antigo, iOS 9/10)

Serve o app por **HTTP** (sem certificado para o iPad recusar), recebe a posição do iPhone e repassa
consultas (clima, rádios, busca de endereço, rotas, busca do YouTube) pelo servidor.

Tudo roda num contêiner isolado na porta **8088**. Nada do que já existe no servidor é alterado.

## Instalar (no VPS)

```bash
git clone https://github.com/vihribeiro/cardeck.git /opt/cardeck-src
mkdir -p /opt/cardeck && cd /opt/cardeck
cp /opt/cardeck-src/vps/server.js /opt/cardeck-src/vps/docker-compose.yml .
mkdir -p app && cp -r /opt/cardeck-src/{index.html,sw.js,manifest.webmanifest,css,js,icons,leaflet,mapbox} app/
echo "TOKEN=$(openssl rand -hex 16)" > .env && chmod 600 .env
docker compose up -d
firewall-cmd --permanent --add-port=8088/tcp && firewall-cmd --reload
cat .env
```

## Usar

- No iPad antigo, abra **uma vez**: `http://76.13.237.77:8088/#k=SEU_TOKEN`  (o token fica salvo no aparelho).
- Em Ajustes → Localização, escolha a ponte com o iPhone.
- Atalho do iPhone (Obter conteúdo de URL, método GET):
  `http://76.13.237.77:8088/api/SEU_TOKEN/loc?lat=LATITUDE&lon=LONGITUDE`
  (use as variáveis de localização do Atalho; automação a cada poucos segundos/minutos).

## Atualizar o app

```bash
cd /opt/cardeck-src && git pull && cd /opt/cardeck && cp -r /opt/cardeck-src/{index.html,sw.js,css,js} app/
```

## Remover tudo

```bash
cd /opt/cardeck && docker compose down && firewall-cmd --permanent --remove-port=8088/tcp && firewall-cmd --reload
rm -rf /opt/cardeck /opt/cardeck-src
```
