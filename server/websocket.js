const ws = require('ws');

const port = 4444;

const wss = new ws.Server({
    port: port
}, () => console.log(`Сервер запущен на ${port}`))


wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        console.log(message)
        message = JSON.parse(message);
        switch (message.event) {
            case 'message': 
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }
    })
})

function broadcastMessage(message) {    //функция для рассылки всем клиентам
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}