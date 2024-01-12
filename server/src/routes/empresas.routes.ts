import { Router } from 'express';
import AppError from '../errors/AppError';
import { executaQuery } from '../database';

const empresasRoutes = Router();

empresasRoutes.post('/', async (request, response) => {
  try{
    const {
      cnpjcpf,
      razaosocial,
      tipo,
      inscricaoestadual,
      nomefantasia,
      regimetributario,
      site,
      email,
      telefone,
      celular,
      whatsapp,
      estado,
      cidade,
      endereco,
      numero,
      bairro,
      complemnto,
      cep
    } = request.body;

    if (!razaosocial) throw new AppError('Nome da empresa vazio.',404);

    if (!email) throw new AppError('E-mail do empresa vazio.',404);

    if (!cnpjcpf) throw new AppError('CPF/CNPJ do empresa vazio.',404);
    

    const query = `INSERT INTO tblempresa (CNPJCPF, RAZAOSOCIAL, TIPO, INSCRICAOESTADUAL, NOMEFANTASIA, REGIMETRIBUTARIO, SITE, EMAIL, TELEFONE, CELULAR, WHATSAPP, ESTADO, CIDADE, ENDERECO, NUMERO, BAIRRO, COMPLEMNTO, CEP)
                   VALUES ('${cnpjcpf}','${razaosocial}','${tipo}', '${inscricaoestadual}', '${nomefantasia}','${regimetributario}', '${site}', '${email}', '${telefone}', '${celular}', '${whatsapp}', '${estado}', '${cidade}', '${endereco}', '${numero}', '${bairro}', '${complemnto}', '${cep}');`;
    const {insertId} = await executaQuery(query) as unknown as { insertId:number;};
    return response.status(201).json({ codigo: insertId });
  } catch ( error ) {
    throw new AppError('Erro na inserção de dados;', 500);
 }
});

empresasRoutes.get('/', async (request, response) => {
   try{
    const query = `SELECT * FROM tblempresa`;
    const empresas = await executaQuery(query);
    // Convertendo as letras maiúsculas para minúsculas
    const empresasLowerCase = empresas.map(empresa => {
      const empresaLowerCase: { [key: string]: any } = {};
      Object.keys(empresa).forEach(key => {
        empresaLowerCase[key.toLowerCase()] = empresa[key];
      });
      return empresaLowerCase;
    });
    return response.status(200).json(empresasLowerCase);
   } catch ( error ) {
    throw new AppError('Parametro invalido;', 500);
  }
});

export default empresasRoutes;
