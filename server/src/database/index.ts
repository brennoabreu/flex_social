import { env } from '../env'
import { knex as setupKnex, Knex } from 'knex'

export const config: Knex.Config = {
  client: env.DB_CLIENT,
  connection: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    database: env.DB_DATABASE,
    password: env.DB_PASSWORD,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './src/database/migrations/',
  },
}

export const knex = setupKnex(config)
