const bcrypt = require("bcrypt");

export const saltRounds: Number = 10;

export const bcryptPassword = (password: String) => {
  bcrypt.genSalt(saltRounds, function (err: any, salt: any) {
    bcrypt.hash(password, salt, function (err: any, hash: string) {
      if (err) throw err;
      else return hash;
    });
  });
};
