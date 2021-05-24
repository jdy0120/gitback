import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';

import { Login } from './Login';
import { Register } from './Register';
import { jwtObj } from '../../_config/jwt-config';
const router = require('express').Router();

/**
 * express router를 이용하여 관련된 api를 묶어 관리할 수 있다.
 */

const EmailDuplicated = (message: string, email: string) => {
  return message === `Error: Duplicate entry '${email}' for key 'PRIMARY'`;
}

/**
 * 회원가입 api
 */
router.post('/register', async (req: Request, res: Response) => {
  const salt = await bcrypt.genSalt(10);

  const args = {
    email: req.body.body.email,
    pw: (await bcrypt.hash(req.body.body.pw, salt)).toString(),
    name: req.body.body.name
  }
  console.log(args.pw);
  try {
    await Register(args);
    res.send('no error');
  } catch (err) {
    if (EmailDuplicated(err.message, args.email)) {
      res.status(409).send('Duplicated email');
    } else {
      console.log(err.message);
      res.status(500).send('internal');
    }
  }
});

const NotValidEmail = (DBResult: any) => {
  console.log(DBResult);
  return DBResult === undefined;
}

const NotValidPW = async (clientPW: any, serverPW: any): Promise<Boolean> => {
  const compareResult = JSON.stringify(await bcrypt.compare(clientPW, serverPW));
  console.log('compare >>', compareResult);
  return Promise.resolve(compareResult === 'false')
}

/**
 * 로그인 api
 */
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const args = {
    email: req.body.body.email,
    pw: req.body.body.pw
  }
  try {
    const DBstatus = await Login(args);
    const getDataFromDB = JSON.parse(JSON.stringify(DBstatus))[0];
    if (NotValidEmail(getDataFromDB)) {
      res.status(403).send('Not valid email');
      res.end();
    }

    if (await NotValidPW(args.pw, getDataFromDB.pw)) {
      res.status(403).send('Not valid password');
    } else {

      const token = jwt.sign({
        email: args.email,
        name: getDataFromDB.name,
        color: getDataFromDB.color,
        choiceEvent: getDataFromDB.choiceEvent
      }, jwtObj.secret);

      const ONE_MINUTE = 60000;
      res.json({
        loginToken: token,
        maxAge: ONE_MINUTE
      });
      res.end();
    }
  } catch (err) {
    res.status(500).send('internal');
  }
});

module.exports = router;