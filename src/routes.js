import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientsController from './app/controllers/RecipientsController';

import auth from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(auth.authMiddleware);

routes.put('/users', UserController.update);

routes.use(auth.providerMiddleware);

routes.post('/recipients', RecipientsController.store);

routes.put('/recipients/:id', RecipientsController.update);

export default routes;
