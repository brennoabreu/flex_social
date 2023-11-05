import express from 'express'
import routes from './routes'
import { env } from './env';

const app = express()

app.use(express.json())

app.use(routes);

app.listen(env.PORT, () => `Server running on port ${env.PORT}`)
