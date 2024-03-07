import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from "../swagger_output.json";
import { router } from './routes';
require('dotenv').config({ path: process.env.NODE_ENV == 'test' ? '.env.test' : '.env' });

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use('/', router);

export { app }