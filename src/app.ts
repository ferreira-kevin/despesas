import 'reflect-metadata';
import express from 'express';
import { router } from './routes';
require('dotenv').config({ path: process.env.NODE_ENV == 'test' ? '.env.test' : '.env' });

const app = express();

app.use(express.json());
app.use(router);

export { app }