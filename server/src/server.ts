import cors from 'cors';
import express from 'express';
import routes from './routes';
import { env } from './env';
import bodyParser from 'body-parser';
import gerenciaErros from './middlewares/gerenciaErros';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(routes);
app.use(gerenciaErros);

app.get('/', (request, response) => {
  response.json('FLEX - API está online');
})

app.listen(env.PORT, () => {
  console.log(`Servidor executando na porta ${env.PORT}`);
});
