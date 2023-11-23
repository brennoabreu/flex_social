import { Router } from 'express';
import { executaQuery } from '../database';
import AppError from '../errors/AppError';

const clientesRoutes = Router();

clientesRoutes.get('/', async (request, response) => {
   try{
    const query = `SELECT * FROM TBLCLIENTE`;
    const cliente = await executaQuery(query);
    return response.json(cliente);
   } catch ( error ) {
    throw new AppError('Parametro invalido;', 500);
  }
});

clientesRoutes.get('/:id', async (request, response) => {
try{
  const { id } = request.params;
  if (!id) {
    throw new AppError('Parametro invalido;', 404);
  }
  const query = `SELECT * FROM TBLCLIENTE WHERE TBLCLIENTE.ID = ${id}`;
  const cliente = await executaQuery(query);
  return response.json(cliente);
 } catch ( error ) {
  throw new AppError('Parametro invalido;', 500);
}
});

clientesRoutes.delete('/:id', async (request, response) => {
  try{
    const { id } = request.params;
    if (!id) {
      throw new AppError('Parametro invalido;', 404);
    }
    const query = `DELETE FROM TBLCLIENTE WHERE TBLCLIENTE.ID = ${id}`;
    await executaQuery(query);
    return response.json({ mensagem: "sucesso" }).status(200);
   } catch ( error ) {
    throw new AppError('Dados invalido;', 500);
  }
});

export default clientesRoutes
