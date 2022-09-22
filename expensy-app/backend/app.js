import express from 'express';
import cors from 'cors';

import expenseRoutes from './routes/expenseRoutes.js';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

//import client from 'prom-client';
const client = require('prom-client');
const register = new client.Registry();
const app = express();

client.collectDefaultMetrics({
  app: 'node-application-monitoring-app',
  prefix: 'node_',
  register,
});

app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

app.use(express.json());

app.use(cors());

app.use('/', expenseRoutes);

app.use(function (err, req, res) {
  console.error(err.stack);
  res.status(500).send('Something broke...');
});

app.use(function (err, req, res) {
  console.error(err.stack);
  res.status(404).send('Resource not found...');
});

export { app };
