import { useEffect, useRef, useState } from 'react';
import './App.css';
import MessagesArea from './components/MessagesArea/MessagesArea';
import InputArea from './components/InputArea/InputArea';
export interface CustomMessage {
  msg: string;
  color: string;
}

const App = () => {
  const [connectionStatus, setConnectionStatus] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<{ msg: string, color: string }>>([]);

  const ws = useRef<WebSocket>()
  useEffect(() => {
    ws.current = new WebSocket(`ws://${process.env.REACT_APP_HOSTNAME}:${process.env.REACT_APP_WS_PORT}`)
    ws.current.addEventListener('open', () => {
      setConnectionStatus(true);
    })
    ws.current.addEventListener('message', (msg) => {
      const data = JSON.parse(msg.data)
      setMessages((oldMessages) => [...oldMessages, { msg: `${data.user}: ${data.message}`, color: data.color }]);
    })
    ws.current.addEventListener('close', () => {
      setConnectionStatus(false);
    })

    return () => {
      ws.current?.close();
      ws.current = undefined;
    }
  }, [])

  const sendMessage = (user: string, color: string, message: string) => {
    ws.current?.send(JSON.stringify({ user, color, message }));
  }

  return (
    <div className='App'>
      Connected to WebSocket: {`${connectionStatus}`}

      <MessagesArea messages={messages} />
      <InputArea sendMessage={sendMessage} connected={connectionStatus} />
    </div>
  );
}

export default App;
