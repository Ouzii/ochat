import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const ws = new WebSocket("ws://localhost:4200")
  const [connectionStatus, setConnectionStatus] = useState(false);

  ws.addEventListener('open', () => {
    setConnectionStatus(true);
  })
  
  return (
    <div className="App">
      TODO: UI
    <br />
      Connected to WebSocket: { connectionStatus ? 'true' : 'false' }
    </div>
  );
}

export default App;
