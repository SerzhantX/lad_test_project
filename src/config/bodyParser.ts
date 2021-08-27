import { Application } from 'express';
import bodyParser from 'body-parser';

export function bodyParserInitialization(server: Application): void {
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
}