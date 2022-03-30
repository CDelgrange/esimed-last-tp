const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const User = require('../models/user.model');
const { validateBody } = require('./validation/route.validator');

router.get('/', async (req, res) => {
  res.send(await User.findAll());
});

router.get('/:firstName', async (req, res) => {
  const foundUser = await User.findOne({ where: { firstName: req.params.firstName }})

  if (!foundUser) {
    return res.status(404).send('User not foud');
  }

  res.send(foundUser);
});

router.post(
  '/',
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('password').notEmpty().isLength({ min: 5 }),
  async (req, res) => {
    validateBody(req);

    const { firstName, lastName, password } = req.body;

    await User.create({
      firstName,
      lastName,
      password,
    }).catch(() => res.status(500).send('Unable to create the user'));

    res.status(201).end();
  }
);

router.put('/:id', async (req, res) => {
  await User.update(req.body, { where: { id: req.params.id } });

  res.status(204).end();
});

router.delete('/:id', async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });

  res.status(204).end();
});

exports.initializeRoutes = () => router;
