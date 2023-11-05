import  { Router } from 'express';

const clientesRoutes = Router();

clientesRoutes.get('/', (request, response) => {
  const cliente ={ message: 'Hello world' };

  return response.json(cliente);
});

clientesRoutes.post('/', (request, response) => {
  const data = request.body;
  console.log(data);
  return response.json({ mensagem: "sucesso" });
});

export default clientesRoutes;
