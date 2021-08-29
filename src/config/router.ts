import { Application, Router } from 'express';
import * as routes from '../router';

const router: Router = Router();

router.post('/login',
  routes.loginRouter.handler
);

router.post('/register',
  routes.registerRouter.handler
);

router.post('/spelling',
  routes.authRouter.handler,
  routes.spellingRouter.handler
);

router.use('/*',
  routes.unknownRouter.handler
);

export function routerInitialization(server: Application) {
  server.use(router);
}