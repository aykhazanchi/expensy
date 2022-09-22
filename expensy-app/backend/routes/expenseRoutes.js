import express from 'express';

const router = express.Router();

import {
  newExpense,
  newUser,
  getUser,
  clearDB,
  getAllUsers,
  getAllExpenses,
} from '../controllers/expenseController.js';

router.route('/add/expense').post(newExpense);

router.route('/add/user').post(newUser);

router.route('/user/:id').get(getUser);

router.route('/expenses').get(getAllExpenses);

router.route('/users').get(getAllUsers);

router.route('/delete').get(clearDB);

export default router;
