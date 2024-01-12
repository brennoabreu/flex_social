import { Router } from 'express';
import { executaQuery } from '../database';
import AppError from '../errors/AppError';


const projetosRouter = Router();

projetosRouter.get('/', async (request, response) => {
  try {
    const query = `select * from tblprojeto`;
    const projeto = await executaQuery(query);
    return response.status(200).json(projeto);
  } catch (error) {
    throw new AppError('Parametro invalido;', 500);
  }
});



projetosRouter.post('/', async (request, response) => {

  try {

    const { nomeprojeto, dtinicial, dtfinal, descricao, publico, responsavel, fkidprograma, email, foto, fkidempresa } = request.body;

    if (!nomeprojeto) throw new AppError('Nome do projeto vazio!', 404);

    if (!dtinicial) throw new AppError(`Data inicial vazio!`, 404);

    if (!dtfinal) throw new AppError('Data final vazio!', 404);

    if (!descricao) throw new AppError('Campo descrição vazio!', 404);

    if (!publico) throw new AppError('Campo publico vazio!', 404);

    if (!responsavel) throw new AppError('Campo responsavel vazio!', 404);

    if (!fkidprograma) throw new AppError('Campo idprograma vazio!', 404);

    if (!email) throw new AppError('Campo email vazio!', 404);

    if (!foto) throw new AppError('Campo foto vazio!', 404);

    if (!fkidempresa) throw new AppError('Campo idempresa vazio!', 404);

    const query = `INSERT INTO tblprojeto (nomeprojeto, dtinicial, dtfinal, descricao, publico, responsavel, fkidprograma, email, foto, fkidempresa) VALUES ('${nomeprojeto}', '${dtfinal}','${dtfinal}','${descricao}', '${publico}', '${responsavel}','${fkidprograma}', '${email}', '${foto}', '${fkidempresa}');`;
    console.log(query);

    const { insertId } = await executaQuery(query) as unknown as { insertId: number; };
    return response.status(201).json({ codigo: insertId });

  } catch (error) {
    throw new AppError('Erro na inserção de dados;', 500);
  }

});



projetosRouter.put('/:id', async (request, response) => {
  try {
    const { nomeprojeto, dtinicial, dtfinal, descricao, publico, responsavel, fkidprograma, email, foto, fkidempresa } = request.body;
    const { id } = request.params;

    if (!nomeprojeto) throw new AppError('Nome do projeto vazio!', 404);

    if (!dtinicial) throw new AppError(`Data inicial vazio!`, 404);

    if (!dtfinal) throw new AppError('Data final vazio!', 404);

    if (!descricao) throw new AppError('Campo descrição vazio!', 404);

    if (!publico) throw new AppError('Campo publico vazio!', 404);

    if (!responsavel) throw new AppError('Campo responsavel vazio!', 404);

    if (!fkidprograma) throw new AppError('Campo idprograma vazio!', 404);

    if (!email) throw new AppError('Campo email vazio!', 404);

    if (!foto) throw new AppError('Campo foto vazio!', 404);

    if (!fkidempresa) throw new AppError('Campo idempresa vazio!', 404);


    if (!id) throw new AppError('Parametro invalido;', 404);


    const query = `UPDATE tblprojeto SET nomeprojeto = '${nomeprojeto}', dtinicial = '${dtinicial}', dtfinal = '${dtfinal}', descricao = '${descricao}', publico = '${publico}', responsavel = '${responsavel}', fkidprograma = '${fkidempresa}',email = '${email}', foto = '${foto}', fkidempresa = '${fkidempresa}' WHERE id = ${id};`;
    await executaQuery(query);
    return response.status(203).json({ "codigo": id });
  } catch (error) {
    throw new AppError('Parametro invalido;', 500);
  }
});

projetosRouter.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    if (!id) throw new AppError('Parametro invalido;', 404);

    const query = `SELECT * FROM tblprojeto WHERE tblprojeto.id = ${id}`;
    const projeto = await executaQuery(query);
    return response.status(200).json(projeto);
  } catch (error) {
    throw new AppError('Parametro invalido;', 500);
  }
});

projetosRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    if (!id) throw new AppError('Parametro invalido;', 404);

    const query = `DELETE FROM tblprojeto WHERE tblprojeto.id = ${id}`;
    await executaQuery(query);
    return response.status(200).json({ mensagem: "sucesso" }).status(200);
  } catch (error) {
    throw new AppError('Dados invalido;', 500);
  }
});

export default projetosRouter
