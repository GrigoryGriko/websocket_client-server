import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';



function App() {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const socket = useRef();
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('')

    function connect() {
        socket.current = new WebSocket('ws://localhost:4444')

        socket.current.onopen = () => {
            setConnected(true)
            console.log(socket)
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
            setValue('')
        }   //когда подключение открылось
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
        }   //когда получаем сообщение
        socket.current.onclose = () => {
            console.info('подключение закрылось')
        }   //когда подключение закрылось
        socket.current.onerror = (err) => {
            console.error('произошла ошибка ' + err)
        }   //когда появилась ошибка
    }

    const sendMessage = async () => {
        const message = {
            username,
            message: value,
            id: Date.now(),
            event: 'message'
        }
        socket.current.send(JSON.stringify(message));
        setValue('')
    }


    if (!connected) {
        return (
            <div className="center">
                <div className="form">
                    <input 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type="text" 
                        placeholder="Введите ваше имя"
                    />
                    <button onClick={connect}>Войти</button>
                </div>
            </div>
        )
    }

    return (
        <div className='center'>
            <div>
                <div className="form">
                    <input value={value} onChange={e => setValue(e.target.value)} type="text" />
                    <button onClick={sendMessage}>Отправить</button>
                </div>
                <div className="messages">
                    {messages.map(mess =>
                        <div key={mess.id}>
                            {mess.event === 'connection'
                                ? 
                                <div className="connection_message">
                                    Пользователь {mess.username} подключился
                                </div>
                                :
                                <div className="message">
                                    {mess.username}. {mess.message}
                                </div>
                            }
                        </div>    
                    )}
                </div>
            </div>
        </div>
    )
}

export default App;
