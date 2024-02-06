import mysql from 'mysql2/promise';
import { env } from '../env';
import Entidade from './Entidade';
import { construirInsert, construirSelect, converteObjeto } from './utils';
import AppError from '../errors/AppError';


export type Origem = 'CLIENTE'|'API';
interface Resposta {
  chave?: any;
  situacao: 'OK' | 'ERRO';
  mensagem?: string;
}

const config = {
  client: env.DB_CLIENT,
  connection: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    database: env.DB_DATABASE,
    password: env.DB_PASSWORD,
  },
  useNullAsDefault: true
}

export async function conexao() {
  const connection = mysql.createConnection({
    host: config.connection.host,
    user: config.connection.user,
    database: config.connection.database,
    port: config.connection.port,
    password: config.connection.password,
  });

  return connection;
}

export const executaSelect = async (Classe: any, objeto: Entidade, origem: Origem = 'CLIENTE',): Promise<Resposta | Resposta[]> => {

  let objetoSelect;
  if (Array.isArray(objeto)) {
    objetoSelect = converteObjeto(objeto, Classe);
  } else {
    objetoSelect = [converteObjeto(objeto, Classe)];
  }
  console.log(`Classe -> ${Classe}`);
}


export const executaInsert = async (
  Classe: any,
  objeto: Entidade,
  origem: Origem = 'CLIENTE',
): Promise<Resposta | Resposta[]> => {
  let sqlInsert = '';
  let objetoInsert;

  console.log("Objeto -> ",objeto);
  if (Array.isArray(objeto)) {
    objetoInsert = converteObjeto(objeto, Classe);
  } else {
    objetoInsert = [converteObjeto(objeto, Classe)];
  }
  console.log("Objeto insert -> ", objetoInsert);

  const sql = new Map();
  if (sql.has('INSERT')) {
    sqlInsert = sql.get('INSERT');
  } else {
    sqlInsert = '';
  }
  sqlInsert += construirInsert(Classe, objetoInsert, origem);
  sql.set('INSERT', sqlInsert);
  sqlInsert = `${sql.get('INSERT')};`;

  console.log("SQL -> ", sql);
  console.log("SqlInsert ->", sqlInsert);

  const db = await conexao();
  await db.query(sqlInsert);
  await db.end();
  const resposta: Resposta = {
    situacao: 'OK',
  };
  return resposta;
};

export const dateFormat = 'yyyy.MM.dd HH:mm:ss.SSS';

export const executaQuery = async (sql: string): Promise<any[]> => {
  const db = await conexao();
  const [retorno] = await db.execute(sql);
  await db.end();
  return retorno as any[];
}

// export function transformarMinusculo(obj: { [key: string]: any }): { [key: string]: any } {
//   const objetoLowerCase: { [key: string]: any } = {};

//   Object.keys(obj).forEach(key => {
//     objetoLowerCase[key.toLowerCase()] = obj[key];
//   });

//   return objetoLowerCase;
// }
