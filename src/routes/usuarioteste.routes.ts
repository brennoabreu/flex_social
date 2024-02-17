import { Router } from 'express';
import AppError from '../errors/AppError';
import Usuario from '../models/Usuario';
import { executaInsert } from '../database/index2';
import { executaSelect } from '../database/index2';
//import garantirAutenticacao from '../middlewares/garantirAutenticacao';

const usuariotesteRoutes = Router();

//usuarioRoutes.use(garantirAutenticacao);


usuariotesteRoutes.get('/', async (request, response) => {

  try{
    const { empresa } = request.query;
    console.log("usuariotesteRoutes -> ",{empresa});
    const resposta = await executaSelect(Usuario, {empresa});
    //return response.json(resposta);
    return response.status(200).json(resposta);
  } catch ( error ) {
    //console.log("Entrou no catch")
    throw new AppError('Erro na inserção de dados;', 400);
  }
});


usuariotesteRoutes.post('/', async (request, response) => {
  try {
    const usuario: Usuario[] = request.body;
    console.log(Usuario,usuario);
    const resposta = await executaInsert(Usuario, usuario);
    return response.json(resposta);
  } catch ( error ) {
    throw new AppError('Erro na inserção de dados;', 400);
  }
});



export default usuariotesteRoutes;
