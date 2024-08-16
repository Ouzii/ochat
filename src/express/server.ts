import express, { Express } from 'express';
import path from 'path';

const startExpressServer = (port: number) => {
    const app: Express = express();
    app.use('/', express.static(path.resolve(__dirname, '../../client/build')));
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
    return app;
}

export default startExpressServer;