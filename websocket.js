const ws = require('ws');

const port = 4444;

const wss = new ws.Server({
    port: port
}, () => console.log(`Сервер запущен на ${port}`))