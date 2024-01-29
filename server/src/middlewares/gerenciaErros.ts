import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';

const gerenciaErros = (erro: Error, request: Request, response: Response, _: NextFunction) => {
  if (erro instanceof AppError) {
    return response.status(erro.statusCode).json({
      situacao: 'error',
      mensagem: erro.message,
    });
  }

  return response.status(500).json({
    situacao: 'error',
    mensagem: `Internal server error - ${erro.message}`,
  });
};

export default gerenciaErros;
