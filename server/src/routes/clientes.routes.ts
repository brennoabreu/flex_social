import { Router } from 'express';
import { executaQuery } from '../database';
import AppError from '../errors/AppError';


const clientesRoutes = Router();

clientesRoutes.get('/', async (request, response) => {
  try {
    const query = `select * from tblcliente`;
    const cliente = await executaQuery(query);
    return response.status(200).json(cliente);
  } catch (error) {
    throw new AppError('Parametro invalido;', 500);
  }
});



clientesRoutes.post('/', async (request, response) => {

  try {
    const { empresa, nome, email, cpf, cnpj, tipo, dtnascimento, ativo, fkidempresa, fkidprojeto} = request.body;

    if (!empresa) throw new AppError('Nome do cliente vazio.', 404);

    if (!nome) throw new AppError(`Nome do cliente ${nome} vazio.`, 404);

    if (!email) throw new AppError('E-mail do cliente vazio.', 404);

    if (!dtnascimento) throw new AppError('Data de nascimento do cliente vazio.', 404);

    if (!ativo) throw new AppError('A opcao ativo do cliente vazio.', 404);

    if (!fkidempresa) throw new AppError('empresa esta vazio.', 404);

    if (!fkidprojeto) throw new AppError('Projeto vazio.', 404);


    const query = `INSERT INTO tblcliente (nome,email,cpf,cnpj,tipo,dtnascimento,ativo, fkidempresa, fkidprojeto)
                   VALUES ('${empresa}', '${nome}','${email}','${cpf}', '${cnpj}', '${tipo}','${dtnascimento}', '${ativo}', '${fkidempresa}', '${fkidprojeto}');`;
    console.log(query);
    const { insertId } = await executaQuery(query) as unknown as { insertId: number; };
    return response.status(201).json({ codigo: insertId });

  } catch (error) {
    throw new AppError('Erro na inserção de dados;', 500);
  }

});



clientesRoutes.put('/:id', async (request, response) => {
  try {
    const { name, email } = request.body;
    const { id } = request.params;

    if (!name) throw new AppError('Nome do cliente vazio.', 404);

    if (!email) throw new AppError('E-mail do cliente vazio.', 404);

    if (!id) throw new AppError('Parametro invalido;', 404);


    const query = `UPDATE tblcliente SET nome = '${name}', email = '${email}' WHERE id = ${id};`;
    await executaQuery(query);
    return response.status(203).json({ "codigo": id });
  } catch (error) {
    throw new AppError('Parametro invalido;', 500);
  }
});

clientesRoutes.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    if (!id) throw new AppError('Parametro invalido;', 404);

    const query = `SELECT * FROM tblcliente WHERE tblcliente.id = ${id}`;
    const cliente = await executaQuery(query);
    return response.status(200).json(cliente);
  } catch (error) {
    throw new AppError('Parametro invalido;', 500);
  }
});

clientesRoutes.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    if (!id) throw new AppError('Parametro invalido;', 404);
  
    const query = `DELETE FROM tblcliente WHERE tblcliente.id = ${id}`;
    await executaQuery(query);
    return response.status(200).json({ mensagem: "sucesso" }).status(200);
  } catch (error) {
    throw new AppError('Dados invalido;', 500);
  }
});

export default clientesRoutes
