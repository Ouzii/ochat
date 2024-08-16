import dotenv from 'dotenv';
import startExpressServer from './express/server';
import startWebSocketServer from './websocket/websocket';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

startExpressServer(Number.parseInt(process.env.PORT || '3000'));
startWebSocketServer(Number.parseInt(process.env.WS_PORT || '3001'));
