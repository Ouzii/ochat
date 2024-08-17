
import { WebSocketServer, WebSocket } from 'ws';

const startWebSocketServer = (port: number) => {
  const wsServer = new WebSocketServer({ port }, () => {
    console.log(`Websocket started on port ${port}`);
  });

  wsServer.on('connection', (ws) => {
    console.log('New connection, current client count:', wsServer.clients.size);

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
  });

  return wsServer;
}

export default startWebSocketServer;