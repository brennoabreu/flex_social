import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';

import configAutenticaco from '../config/autenticacao'
interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function garantirAutenticacao(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, configAutenticaco.jwt.secret);

    const { sub } = decoded as TokenPayload;
    const [empresa, codigo] = sub.split(' ');

    request.usuario = {
      empresa: empresa as unknown as string,
      codigo: codigo as unknown as number,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
