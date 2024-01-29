"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conexao = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const env_1 = require("../env");
const config = {
    client: env_1.env.DB_CLIENT,
    connection: {
        host: env_1.env.DB_HOST,
        port: env_1.env.DB_PORT,
        user: env_1.env.DB_USER,
        database: env_1.env.DB_DATABASE,
        password: env_1.env.DB_PASSWORD,
    },
    useNullAsDefault: true
};
function conexao() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = promise_1.default.createConnection({
            host: config.connection.host,
            user: config.connection.user,
            database: config.connection.database,
            port: config.connection.port,
            password: config.connection.password,
        });
        return connection;
    });
}
exports.conexao = conexao;
// export const executaQuery = async (sql: string): Promise<any[]> => {
//   const db = await conexao();
//   const [retorno] = await db.execute(sql);
//   await db.end();
//   return retorno as any[];
// }
// export function transformarMinusculo(obj: { [key: string]: any }): { [key: string]: any } {
//   const objetoLowerCase: { [key: string]: any } = {};
//   Object.keys(obj).forEach(key => {
//     objetoLowerCase[key.toLowerCase()] = obj[key];
//   });
//   return objetoLowerCase;
// }
