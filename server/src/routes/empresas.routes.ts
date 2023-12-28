import { Router } from 'express';
import AppError from '../errors/AppError';
import { executaQuery } from '../database';

const empresasRoutes = Router();

empresasRoutes.post('/', async (request, response) => {
  try{
    const { name, email, cpfcnpj, tipo } = request.body;

    if (!name) {
      throw new AppError('Nome da empresa vazio.',404);
    }

    if (!email) {
      throw new AppError('E-mail do empresa vazio.',404);
    }

    if (!cpfcnpj) {
      throw new AppError('CPF/CNPJ do empresa vazio.',404);
    }

    const query = `INSERT INTO TBLEMPRESA (nome,email,cpfcnpj,tipo)
                   VALUES ('${name}','${email}','${cpfcnpj}', '${tipo}');`;
    const {insertId} = await executaQuery(query) as unknown as { insertId:number;};
    return response.status(201).json({ codigo: insertId });
  } catch ( error ) {
    throw new AppError('Erro na inserção de dados;', 500);
 }
});

empresasRoutes.get('/', async (request, response) => {
   try{
    const query = `SELECT * FROM TBLEMPRESA`;
    console.log(query);
    const empresa = await executaQuery(query);
    return response.status(200).json(empresa);
   } catch ( error ) {
    throw new AppError('Parametro invalido;', 500);
  }
});

export default empresasRoutes;
