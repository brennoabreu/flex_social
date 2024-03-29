import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import { env } from './env';
import AppError from './errors/AppError';

const app = express();
app.use(express.json());
app.use(routes);

app.use((err: Error, request:Request, response:Response, _: NextFunction) =>{
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.get('/', (request, response) => {
  response.json('API ativa');
})

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
