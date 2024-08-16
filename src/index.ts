import dotenv from 'dotenv';
import startExpressServer from './express/server';
import startWebSocketServer from './websocket/websocket';
import path from 'path';

dotenv.config();

const expressServer = startExpressServer(Number.parseInt(process.env.PORT || '3000'));
const WebSocketServer = startWebSocketServer(Number.parseInt(process.env.WS_PORT || '4200'));
