import { Router } from "express";
import { sign } from 'jsonwebtoken';
import configAutenticacao from '../config/autenticacao';
import AppError from "../errors/AppError";

const tokenRouter = Router();

tokenRouter.post('/', async (request, response) => {
  const b64auth = (request.headers.authorization || '').split(' ')[1] || '';
  const [login, senha] = Buffer.from(b64auth, 'base64').toString().split(':');

  if (!login || !senha) {
    throw new AppError('Informe o usuário e a senha', 401);
  }
  const { secret, expiresIn } = configAutenticacao.jwt;;
  const token = sign({}, secret, {
    subject: login+' '+senha ,
    expiresIn,
  });

  return response.json({
    token,
  });
});

export default tokenRouter;
