import { NextFunction, Request, Response } from 'express';
import { Register } from './Register';
import * as bcrypt from 'bcrypt';
import { jwtObj } from '../../_config/jwt-config';
import * as jwt from 'jsonwebtoken';
import { Login } from './Login';
const router = require('express').Router();

/**
 * express router를 이용하여 관련된 api를 묶어 관리할 수 있다.
 */

/**
 * router연습용 api
 */
router.get('/view', (req:Request,res:Response) => {
  res.send('This is view page');
})

/**
 * 회원가입 api
 */
router.post('/register', async (req:Request,res:Response) => {
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
    if (err.message === `Error: Duplicate entry '${args.email}' for key 'email'`){
      res.status(409).send('Duplicated email');
    } else {
      console.log(err.message);
      res.status(500).send('internal');
    }
  }
});

/**
 * 로그인 api
 */
router.post('/login', async (req:Request,res:Response,next:NextFunction) => {
  const args = {
    email: req.body.body.email,
    pw: req.body.body.pw
  }
  console.log(args.email);
  console.log(args.pw);
  try {
    const DBstatus = await Login(args);
    const getDataFromDB = JSON.parse(JSON.stringify(DBstatus))[0];
    if (!getDataFromDB) {
      res.status(403).send('Not valid email');
      res.end();
    }
    console.log('compare >>', JSON.stringify(await bcrypt.compare(args.pw, getDataFromDB.pw)));
    if (!await bcrypt.compare(args.pw, getDataFromDB.pw)) {
      res.status(403).send('Not valid password');
    } else {
      const token = jwt.sign({email: args.email}, jwtObj.secret);
      res.cookie('loginToken',token,{ httpOnly:true, maxAge:60000 });
      res.cookie('name',getDataFromDB.name,{ maxAge:60000 });
      res.end();
    }
  } catch (err) {
    res.status(500).send('internal');
  }
});

module.exports = router;