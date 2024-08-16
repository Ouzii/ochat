import { useEffect, useRef, useState } from 'react';
import './App.css';
import { CirclePicker, GithubPicker, SketchPicker } from 'react-color';

const App = () => {
  const [connectionStatus, setConnectionStatus] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [username, setUsername] = useState<string>('Anon');
  const [messages, setMessages] = useState<Array<{msg: string, color: string}>>([]);
  const [color, setColor] = useState<string>('#2196f3')

  const ws = useRef<WebSocket>()
  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:4200')
    ws.current.addEventListener('open', () => {
      setConnectionStatus(true);
      console.log(ws);
    })
    ws.current.addEventListener('message', (msg) => {
      const data = JSON.parse(msg.data)
      setMessages((oldMessages) => [...oldMessages, {msg: `${data.user}: ${data.message}`, color: data.color}]);
    })
    ws.current.addEventListener('close', () => {
      setConnectionStatus(false);
    })

    return () => {
      ws.current?.close();
      ws.current = undefined;
    }
  }, [])

  const sendMessage = () => {
    console.log(ws.current);
    ws.current?.send(JSON.stringify({ user: username, message: inputValue, color: color }));
    setInputValue('');
  }

  return (
    <div className='App'>
      Connected to WebSocket: {`${connectionStatus}`}

      <div className='messageArea'>
        <ul>
          {messages.map((msg) => <li style={{color: msg.color}}>{msg.msg}</li>)}
        </ul>
      </div>
      <form className='inputArea' onSubmit={(e) => { e.preventDefault(); sendMessage() }}>
        <label>Username</label>
        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>
        <CirclePicker color={color} onChange={(c) => setColor(c.hex)}/>
        <label>Message</label>
        <textarea value={inputValue} rows={6} cols={24} onChange={(e) => setInputValue(e.target.value)}></textarea>
        <input type='submit' value='Send' disabled={!connectionStatus}></input>
      </form>
    </div>
  );
}

export default App;
