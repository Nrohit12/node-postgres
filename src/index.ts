// const express = require("express");
// const bodyParser = require('body-parser')
// const app = express();
// const db = require('./users/queries')

import express, {Application, Request, Response, NextFunction} from 'express';
import dotenv from "dotenv"
import { PrismaClient } from '@prisma/client'
dotenv.config();


const prisma = new PrismaClient()

const app : Application = express()

async function main() {
  await prisma.user.create({
    data: {
      name: 'Rohit',
      email: 'rohit@gmail.com',
      password1: 'rohit123',
      password2: 'rohit123',
    },
  })

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

// app.use(bodyParser.json())
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// )


// app.get('/users', db.getUsers)
// app.get('/users/:id', db.getUserById)
// app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)

app.get('/', function(req:Request, res:Response){
  res.json({
    name: "Rohit",
    email:"rohit@gmail.com"
  })
})
const port : string = process.env.NODE_RUN_PORT!;
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})