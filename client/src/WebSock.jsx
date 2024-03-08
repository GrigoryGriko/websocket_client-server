import React from 'react';



function App() {
  coonst [MessageChannel, setMessages] = useState([]);
  const [value, setValue] = useState('');

    const subcribe = async () => {
        const eventSource = new EventSource(`http://localhost:4444/connect`)
        eventSource.onmessage = function (event) {
            const message = JSON.parse(event.data);
            setMessages(prev => [message, ...prev]);
        }
    }

    const sendMessage = async () => {
        await axios.post('http://localhost:4444/new-messages', {
            message: value,
            id: Date.now()
        })
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
