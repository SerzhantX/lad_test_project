import { Application, Router } from 'express';
import * as routes from '../router';

const router: Router = Router();

router.post('/spelling',
  routes.spellingRouter.handler
);

router.use('/*',
  routes.unknownRouter.handler
);

export function routerInitialization(server: Application) {
  server.use(router);
}