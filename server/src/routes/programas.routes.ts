import { Router } from 'express';
import { executaQuery } from '../database';
import AppError from '../errors/AppError';


const programasRouter = Router();

programasRouter.get('/', async (request, response) => {
  try {
    const query = `select * from tblprograma`;
    const programa = await executaQuery(query);
    return response.status(200).json(programa);
  } catch (error) {
    throw new AppError('Parametro invalido;', 500);
  }
});



programasRouter.post('/', async (request, response) => {

  try {

    const {nome, descricao,fkidempresa } = request.body;

    if (!nome) throw new AppError('Nome do projeto vazio!', 404);

    if (!descricao) throw new AppError(`Data inicial vazio!`, 404);

    if (!fkidempresa) throw new AppError('Campo idempresa vazio!', 404);

    const query = `INSERT INTO tblprograma(nome, descricao, fkidempresa) VALUES ('${nome}','${descricao}','${fkidempresa}');`;
    console.log(query);

    const { insertId } = await executaQuery(query) as unknown as { insertId: number; };
    return response.status(201).json({ codigo: insertId });

  } catch (error) {
    throw new AppError('Erro na inserção de dados;', 500);
  }

});



programasRouter.put('/:id', async (request, response) => {
  try {
    const { nome, descricao, fkidempresa} = request.body;
    const { id } = request.params;

    if (!nome) throw new AppError('Nome do projeto vazio!', 404);

    if (!descricao) throw new AppError(`Data inicial vazio!`, 404);

    if (!fkidempresa) throw new AppError('Campo idempresa vazio!', 404);

    if (!id) throw new AppError('Parametro invalido;', 404);

    const query = `UPDATE tblprograma SET nome = '${nome}', descricao = '${descricao}', fkidempresa = '${fkidempresa}' WHERE id = ${id};`;

    await executaQuery(query);
    return response.status(203).json({ "codigo": id });
  } catch (error) {
    throw new AppError('Parametro invalido;', 500);
  }
});

programasRouter.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    if (!id) throw new AppError('Parametro invalido;', 404);

    const query = `SELECT * FROM tblprograma WHERE tblprograma.id = ${id}`;
    const programa = await executaQuery(query);
    return response.status(200).json(programa);
  } catch (error) {
    throw new AppError('Parametro invalido;', 500);
  }
});

programasRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    if (!id)throw new AppError('Parametro invalido;', 404);

    const query = `DELETE FROM tblprograma WHERE tblprograma.id = ${id}`;
    await executaQuery(query);
    return response.status(200).json({ mensagem: "sucesso" }).status(200);
  } catch (error) {
    throw new AppError('Dados invalido;', 500);
  }
});

export default programasRouter
