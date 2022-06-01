import express, {Application, Request, Response, NextFunction} from 'express';
const { PrismaClient } = require('@prisma/client');

const router = require('express').Router();

const prisma = new PrismaClient

router.get('/', async (req:Request, res:Response, next:NextFunction) => {
  res.send({ message: 'Ok api is working 🚀' });
});


module.exports = router;