
import { WebSocketServer, WebSocket } from 'ws';

const startWebSocketServer = (port: number) => {
  const wsServer = new WebSocketServer({ port }, () => {
    console.log(`Websocket started on port ${port}`);
  });

  wsServer.on('connection', (ws, req) => {
    console.log(wsServer.clients.size);
    
    ws.on('error', console.error);

    ws.on('message', (data) => {
      const msg = JSON.parse(data.toString());
      console.log(msg);
      
      wsServer.clients.forEach((client, index) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(msg));
        }
      });
    });

    // ws.send();
  });
  
  return wsServer;
}

export default startWebSocketServer;