import mysql from 'mysql2/promise';
import { env } from '../env';

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

export const executaQuery = async ( sql: string): Promise<any[]> => {
  const db = await conexao();
  const [retorno] = await db.execute(sql);
  await db.end();
  return retorno as any[];

}



