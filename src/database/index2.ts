import mysql from 'mysql2/promise';
import { env } from '../env';
import Entidade from './Entidade';
import { construirInsert, construirSelect, converteObjeto } from './utils2';
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

export const executaSelect = async (Classe: any, objeto: Entidade, origem: Origem = 'CLIENTE'): Promise<Resposta | Resposta[]> => {

  let sqlSelect = '';
  let objetoSelect;

  console.log("executaSelect -> objeto ->", objeto);

  console.log(`executaSelect -> Classe -> ${Classe}`);

  if (Array.isArray(objeto)) {
    objetoSelect = converteObjeto(objeto, Classe);
  } else {
    objetoSelect = [converteObjeto(objeto, Classe)];
  }
  console.log("executaSelect -> objetoSelect -> ", objetoSelect);

  const sql = new Map();
  console.log("executaSelect -> sql ->", sql);

  if (sql.has('SELECT')) {
    sqlSelect = sql.get('SELECT');
  } else {
    sqlSelect = '';
  }

  console.log("1-executaSelect -> sqlSelect ->", sqlSelect)

  sqlSelect+= construirSelect(Classe, objeto, origem);
  sql.set('SELECT', sqlSelect);
  //sqlSelect = `${sql.get('SELEC')};`;

  console.log("2-executaSelect -> sqlSelect ->", sqlSelect);
  console.log(typeof(sqlSelect));

  const db = await conexao();
  const [retorno] = await db.execute(sqlSelect);
  await db.end();
  return retorno as any[];

};


export const executaInsert = async (
  Classe: any,
  objeto: Entidade,
  origem: Origem = 'CLIENTE',
): Promise<Resposta | Resposta[]> => {
  let sqlInsert = '';
  let objetoInsert;

  console.log("executaInsert -> Objeto -> ",objeto);
  if (Array.isArray(objeto)) {
    objetoInsert = converteObjeto(objeto, Classe);
  } else {
    objetoInsert = [converteObjeto(objeto, Classe)];
  }
  console.log("executaInsert -> objetoinsert -> ", objetoInsert);

  const sql = new Map();
  if (sql.has('INSERT')) {
    sqlInsert = sql.get('INSERT');
  } else {
    sqlInsert = '';
  }

  console.log("executaInsert -> SQL -> ", sql);
  console.log("1-executaInsert -> SqlInsert ->", sqlInsert);

  sqlInsert += construirInsert(Classe, objetoInsert, origem);
  sql.set('INSERT', sqlInsert);
  sqlInsert = `${sql.get('INSERT')};`;

  console.log("2-executaInsert -> SqlInsert ->", sqlInsert);

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
  console.log("sql do excutaQuery ->",sql);
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
