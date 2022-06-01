const { PrismaClient } = require('@prisma/client');

const router = require('express').Router();

const prisma = new PrismaClient

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});


module.exports = router;