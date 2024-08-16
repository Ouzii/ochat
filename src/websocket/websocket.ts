
import { WebSocketServer } from 'ws';

const startWebSocketServer = (port: number) => {
  const wsServer = new WebSocketServer({ port }, () => {
    console.log(`Websocket started on port ${port}`);
  });

  wsServer.on('connection', (ws) => {
    ws.on('error', console.error);

    ws.on('message', (data) => {
      wsServer.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });

    ws.send('something');
  });
  
  return wsServer;
}

export default startWebSocketServer;