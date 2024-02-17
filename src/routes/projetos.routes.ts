// import { Router } from 'express';
// import { executaQuery, transformarMinusculo } from '../database';
// import AppError from '../errors/AppError';

// const projetosRouter = Router();

// projetosRouter.post('/', async (request, response) => {
//   try {
//     const {
//       empresa, nome, dtinicial, dtfinal,
//       descricao, publico, responsavel, idprograma, email, foto,
//       telefone, operadora
//     } = request.body;

//     if (!empresa) {
//       throw new AppError('Informe o empresa, parametro vazio!', 404);
//     }

//     if (!nome) {
//       throw new AppError('Informe o nome, parametro vazio!', 404);
//     }

//     if (!idprograma) {
//       throw new AppError('Informe o programa, parametro vazio!', 404);
//     }

//     if (!dtinicial) {
//       throw new AppError(`Informe a data inicial, parametro vazio!`, 404);
//     }

//     if (!dtfinal) {
//       throw new AppError('Informe a data final, parametro vazio!', 404);
//     }

//     if (!descricao) {
//       throw new AppError('Informe a descrição, parametro vazio!', 404);
//     }

//     if (!publico) {
//       throw new AppError('Informe o publíco, parametro vazio!', 404);
//     }

//     if (!responsavel) {
//       throw new AppError('Informe o responsavel, parametro vazio!', 404);
//     }

//     if (!email) {
//       throw new AppError('Informe o email, parametro vazio!', 404);
//     }

//     if (!foto) {
//       throw new AppError('Informe a url da foto, parametro vazio!', 404);
//     }

//     const query = `INSERT INTO TBLPROJETO (nome, datainicial, datafinal,
//                     descricao, publico, responsavel, idprograma, email, urlfoto, empresa, telefone, operadora)
//                   VALUES ('${nome}', '${dtfinal}','${dtfinal}','${descricao}',
//                   '${publico}', '${responsavel}','${idprograma}', '${email}', '${foto}', '${empresa}','${telefone}','${operadora}');`;

//     console.log(query);
//     const { insertId } = await executaQuery(query) as unknown as { insertId: number; };
//     return response.status(201).json({ codigo: insertId });
//   } catch (error) {
//     throw new AppError('Erro na inserção de dados;', 500);
//   }
// });

// projetosRouter.put('/', async (request, response) => {
//   try {
//     const { nome, datainicial, datafinal, descricao, publico, responsavel,
//          idprograma, email, urlfoto, telefone, operadora } = request.body;
//     const { id, empresa } = request.query;

//     if (!id) {
//       throw new AppError('Parametro invalido;', 404);
//     }
//     if (!empresa) {
//       throw new AppError('Campo idempresa vazio!', 404);
//     }

//     if (!nome) {
//       throw new AppError('Nome do projeto vazio!', 404);
//     }

//     if (!datainicial) {
//       throw new AppError(`Data inicial vazio!`, 404);
//     }

//     if (!datafinal) {
//       throw new AppError('Data final vazio!', 404);
//     }

//     if (!descricao) {
//       throw new AppError('Campo descrição vazio!', 404);
//     }

//     if (!publico) {
//       throw new AppError('Campo publico vazio!', 404);
//     }

//     if (!responsavel) {
//       throw new AppError('Campo responsavel vazio!', 404);
//     }

//     if (!idprograma) {
//       throw new AppError('Campo idprograma vazio!', 404);
//     };

//     if (!email) {
//       throw new AppError('Campo email vazio!', 404);
//     }

//     if (!urlfoto) {
//       throw new AppError('Campo foto vazio!', 404);
//     }

//     const query = `UPDATE TBLPROJETO SET nome = '${nome}',
//                     datainicial = '${datainicial}', datafinal = '${datafinal}', descricao = '${descricao}', publico = '${publico}', responsavel = '${responsavel}',
//                     idprograma = '${idprograma}',email = '${email}', urlfoto = '${urlfoto}', telefone = '${telefone}', operadora = '${operadora}'
//                     WHERE id = ${id} AND empresa = '${empresa}';`;

//     await executaQuery(query);
//     return response.status(203).json({ "codigo": id });
//   } catch (error) {
//     throw new AppError('Parametro invalido;', 500);
//   }
// });

// projetosRouter.get('/', async (request, response) => {
//   try {
//     const { id, empresa } = request.query;
//     let query = '';
//     if((id) && (empresa)) {
//       query = `SELECT * FROM TBLPROJETO
//                       WHERE TBLPROJETO.EMPRESA = '${empresa}'
//                         AND TBLPROJETO.ID = ${id}`;

//     } else if(empresa) {
//       query = `SELECT * FROM TBLPROJETO
//                       WHERE TBLPROJETO.EMPRESA = '${empresa}'`;

//     };

//     if (query !== '') {
//       const projeto = await executaQuery(query);
//       const resultado = projeto.map(transformarMinusculo);
//       return response.status(200).json(resultado);
//     }
//     return response.status(200).json([]);
//   } catch (error) {
//     throw new AppError('Parametro invalido;', 500);
//   }
// });

// projetosRouter.delete('/', async (request, response) => {
//   try {
//     const { id, empresa } = request.query;
//     if (!id) {
//       throw new AppError('Parametro invalido;', 404);
//     }
//     if (!empresa) {
//       throw new AppError('Parametro invalido;', 404);
//     }
//     const query = `DELETE FROM TBLPROJETO WHERE TBLPROJETO.empresa = ${empresa} AND TBLPROJETO.id = ${id}`;
//     await executaQuery(query);
//     return response.status(200).json({ mensagem: "sucesso" }).status(200);
//   } catch (error) {
//     throw new AppError('Dados invalido;', 500);
//   }
// });

// export default projetosRouter
