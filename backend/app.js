import express from 'express';
import cors from 'cors';

import expenseRoutes from './routes/expenseRoutes.js';

const app = express();

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
