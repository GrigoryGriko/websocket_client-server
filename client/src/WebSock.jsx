import React from 'react';



function App() {
    const [MessageChannel, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const socket = useRef();
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('')

    useEffect(() => {
        socket.current = new WebSocket('ws://localhost:4444')

        socket.current.onopen = () => {
            setConnected(true)
        }   //когда подключение открылось
        socket.current.onmessage = () => {

        }   //когда получаем сообщение
        socket.current.onclose = () => {
            console.info('подключение закрылось')
        }   //когда подключение закрылось
        socket.current.onerror = () => {
            console.error('произошла ошибка')
        }   //когда появилась ошибка
    }, [])


    const sendMessage = async () => {
        await axios.post('http://localhost:4444/new-messages', {
            message: value,
            id: Date.now()
        })
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
                    <button>Войти</button>
                </div>
            </div>
        )
    }

    return (
        <div className='center'>
            <div>
                <div className="form">
                    <input value={value} onChange={e => setValue(e.target.value)} type="text" />
                    <buttom onClick={sendMessage}>Отправить</buttom>
                </div>
                <div className="messages">
                    {messages.map(mess =>
                        <div className="message" key={mess.id}>
                            {mess.message}
                        </div>    
                    )}
                </div>
            </div>
        </div>
    )
}

export default App;
