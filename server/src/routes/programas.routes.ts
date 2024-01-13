import { Router } from 'express';
import { executaQuery, transformarMinusculo } from '../database';
import AppError from '../errors/AppError';

const programasRouter = Router();

// programasRouter.get('/', async (request, response) => {
//   try {
//     const query = `SELECT * FROM TBLPROGRAMA`;
//     const programa = await executaQuery(query);
//     return response.status(200).json(programa);
//   } catch (error) {
//     throw new AppError('Parametro invalido;', 500);
//   }
// });

programasRouter.post('/', async (request, response) => {

  try {
    const {nome, descricao, empresa } = request.body;

    if (!nome) {
      throw new AppError('Informe o nome do projeto, parametro vazio!', 404);
    }

    if (!descricao) {
      throw new AppError(`Informe a descriação, parametro vazio!`, 404);
    }

    if (!empresa) {
      throw new AppError('Informe a empresa, parametro vazio!', 404);
    }

    const query = `INSERT INTO TBLPROGRAMA(nome, descricao, empresa)
                   VALUES ('${nome}','${descricao}','${empresa}');`;

    const { insertId } = await executaQuery(query) as unknown as { insertId: number; };
    return response.status(201).json({ codigo: insertId });

  } catch (error) {
    throw new AppError('Erro na inserção de dados;', 500);
  }

});

programasRouter.put('/', async (request, response) => {
  try {
    const {nome, descricao} = request.body;
    const { id, empresa } = request.query;

    if (!id) {
      throw new AppError('Parametro invalido;', 404);
    }
    if (!empresa) {
      throw new AppError('Parametro invalido;', 404);
    }

    if (!nome) {
      throw new AppError('Nome do projeto vazio!', 404);
    }

    if (!descricao) {
      throw new AppError(`Descrição  vazio!`, 404);
    }

    const query = `UPDATE TBLPROGRAMA SET nome = '${nome}', descricao = '${descricao}' WHERE id = ${id} and empresa = ${empresa};`;
    await executaQuery(query);
    return response.status(203).json({ "codigo": id });
  } catch (error) {
    throw new AppError('Parametro invalido;', 500);
  }
});

programasRouter.get('/', async (request, response) => {
  try {
    const { id, empresa } = request.query;
    let query = '';
    if((id) && (empresa)) {
      query = `SELECT * FROM TBLPROGRAMA
                      WHERE TBLPROGRAMA.EMPRESA = '${empresa}'
                        AND TBLPROGRAMA.ID = ${id}`;

    } else if(empresa) {
      query = `SELECT * FROM TBLPROGRAMA
                      WHERE TBLPROGRAMA.EMPRESA = '${empresa}'`;

    };

    if (query !== '') {
      const programa = await executaQuery(query);
      const resultado = programa.map(transformarMinusculo);
      return response.status(200).json(resultado);
    }
    return response.status(200).json([]);
  } catch (error) {
    throw new AppError('Parametro invalido;', 500);
  }
});

programasRouter.delete('/', async (request, response) => {
  try {
    const { id, empresa } = request.query;

    if (!id) {
      throw new AppError('Parametro invalido;', 404);
    }
    if (!empresa) {
      throw new AppError('Parametro invalido;', 404);
    }

    const query = `DELETE FROM TBLPROGRAMA WHERE TBLPROGRAMA.id = ${id} AND TBLPROGRAMA.empresa = ${empresa}`;
    await executaQuery(query);
    return response.status(200).json({ mensagem: "sucesso" }).status(200);
  } catch (error) {
    throw new AppError('Dados invalido;', 500);
  }
});

export default programasRouter
