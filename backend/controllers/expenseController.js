import { PrismaClient } from '@prisma/client';
import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

const newUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const username = req.body.username;

  try {
    const newUser = await prisma.user.create({
      data: {
        username: username,
      },
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const newExpense = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const amount = Number(req.body.amount);
  const merchant = req.body.merchant;
  const userId = Number(req.body.userId);

  try {
    const newExpense = await prisma.expense.create({
      data: {
        amount: amount,
        merchant: merchant,
        userId: userId,
      },
    });
    res.status(200).json(newExpense);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const getUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = Number(req.params.id);

  try {
    const userData = await prisma.user.findFirst({
      where: {
        id: id,
      },
      include: { expenses: true },
    });
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userData = await prisma.user.findMany({});

    res.status(200).json(userData);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const getAllExpenses = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const expenseData = await prisma.expense.findMany({});

    res.status(200).json(expenseData);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const clearDB = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const delUsers = await prisma.user.deleteMany({});
    const delExpense = await prisma.expense.deleteMany({});

    res.status(200).json('DB deleted...');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export { newUser, newExpense, getUser, getAllUsers, getAllExpenses, clearDB };
