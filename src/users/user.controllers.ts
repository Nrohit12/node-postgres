import { PrismaClient, User } from "@prisma/client";
import express, { Application, Request, Response, NextFunction } from "express";
import passport from "passport";
// import { bcryptPassword } from "../../_config/_signup";
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const prisma = new PrismaClient();

export const _signupUser = async (req: Request, res: Response) => {
  let { email, name, password1, password2 } = req.body();

  if (password1 !== password2) {
    console.log("Passwords do not match");
  } else {
    passport.use(
      new LocalStrategy(function (
        email: string,
        password: string,
        name: string,
        callBack: any
      ) {
        const userExist = prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        if (!userExist) {
          bcrypt.genSalt(10, (err: any, salt: any) =>
            bcrypt.hash(password1, salt, (err: any, hash: string) => {
              if (err) throw err;
              password = hash;
            })
          );
          const user = prisma.user.create({
            data: {
              name: name,
              email: email,
              password: password,
            },
          });
        }
      })
    );
  }
};
