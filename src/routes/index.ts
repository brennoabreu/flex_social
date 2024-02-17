import { Router } from 'express';
import empresasRouter from './empresas.routes'
import usuarioRouter from './usuario.routes';
import usuariotesteRoutes from './usuarioteste.routes';
// import clientesRouter from './clientes.routes';
// import projetosRouter  from './projetos.routes';
// import programasRouter from './programas.routes';
import tokenRouter from './token.routes';

const routes = Router();

routes.use('/empresas', empresasRouter);
// routes.use('/clientes', clientesRouter);
// routes.use('/projetos', projetosRouter);
// routes.use('/programas', programasRouter);
routes.use('/token', tokenRouter);
routes.use('/usuario', usuarioRouter);
routes.use('/usuarioteste',usuariotesteRoutes);

export default routes;
