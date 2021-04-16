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
  try {
    Register(args);
    res.send('no error')
  } catch (err) {
    res.status(500).send('internal')
  }
})

/**
 * 로그인 api
 */
router.post('/login', async (req:Request,res:Response,next:NextFunction) => {
  const salt = await bcrypt.genSalt(10);
  console.log('salt >> ',salt);
  const args = {
    email: req.body.body.email,
    pw: (await bcrypt.hash(req.body.body.pw, salt)).toString()
  }

  try {
    const DBstatus = await Login(args);
    const getDataFromDB = JSON.parse(JSON.stringify(DBstatus))[0];
    if (!getDataFromDB) {
      throw new Error('not vlalid email or pw')
    }
    const token = jwt.sign({email: args.email}, jwtObj.secret);
    res.cookie('loginToken',token);
    res.end();
  } catch (err) {
    res.status(500).send('internal');
  }
});

module.exports = router;