import { Router } from 'express';
import AppError from '../errors/AppError';
import Usuario from '../models/Usuario';
import { executaInsert } from '../database/index';
import { executaSelect } from '../database/index';
//import garantirAutenticacao from '../middlewares/garantirAutenticacao';

const usuarioRoutes = Router();

//usuarioRoutes.use(garantirAutenticacao);


usuarioRoutes.get('/', async (request, response) => {

  try{
    const consultaSQL: Usuario[] = request.body;
    const resposta = await executaSelect(Usuario, consultaSQL);
    return response.json(resposta);
  } catch ( error ) {
    throw new AppError('Erro na inserção de dados;', 400);
  }
});


usuarioRoutes.post('/', async (request, response) => {
  try {
    const usuario: Usuario[] = request.body;
    console.log(Usuario,usuario);
    const resposta = await executaInsert(Usuario, usuario);
    return response.json(resposta);
  } catch ( error ) {
    throw new AppError('Erro na inserção de dados;', 400);
  }
});



export default usuarioRoutes;
