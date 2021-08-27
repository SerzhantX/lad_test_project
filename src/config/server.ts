import express, { Application } from 'express';
import { bodyParserInitialization } from './bodyParser';
import { routerInitialization } from './router';

const server: Application = express();

bodyParserInitialization(server);
routerInitialization(server);

export { server };