// const express = require("express");
// const bodyParser = require('body-parser')
// const app = express();
// const db = require('./users/queries')
const createError = require('http-errors');
const morgan = require('morgan');

import express, {Application, Request, Response, NextFunction} from 'express';
import dotenv from "dotenv"
import { PrismaClient } from '@prisma/client'
dotenv.config();


const prisma = new PrismaClient()

const app : Application = express()

async function main() {

  const allUsers = await prisma.user.findMany()
  console.dir(allUsers)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan('dev'));
  
  app.get('/', async (req:Request, res:Response, next:NextFunction) => {
    res.send({ message: 'Awesome it works 🐻' });
  });
  
  app.use('/api', require('../routes/api.routes'));
  
  app.use((req:Request, res:Response, next:NextFunction) => {
    next(createError.NotFound());
  });
  app.use((err: any, req:Request, res:Response, next:NextFunction) => {
    res.status(err.status || 500);
    res.send({
      status: err.status || 500,
      message: err.message,
    });
  });
const port : string = process.env.NODE_RUN_PORT!;
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})