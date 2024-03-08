const ws = require('ws');

const port = 4444;

const wss = new ws.Server({
    port: port
}, () => console.log(`Сервер запущен на ${port}`))


wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message);
        switch (message.event) {
            case 'message': 

            break;
        }
    })
})

const message = {
    event: 'message/connection',
    id: 888,
    date: '21.01.2021',
    username: 'Tony',
    message: 'Привет'
}