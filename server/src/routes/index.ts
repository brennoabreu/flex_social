import { Router } from 'express';
import empresasRouter from './empresas.routes'
import clientesRouter from './clientes.routes';

const routes = Router();

routes.use('/empresas', empresasRouter);
routes.use('/clientes', clientesRouter);

export default routes;
