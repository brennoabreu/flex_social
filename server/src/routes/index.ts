import { Router } from 'express';

import clientesRouter from './clientes.routes';

const routes = Router();

routes.use('/clientes', clientesRouter);

export default routes;
