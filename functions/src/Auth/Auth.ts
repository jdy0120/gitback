import { Request, Response } from 'express';
import { Register } from './Register';
import * as bcrypt from 'bcrypt';
import { jwtObj } from '../../_config/jwt-config';
import * as jwt from 'jsonwebtoken';
import { Login } from './Login';
const router = require('express').Router();

router.get('/view', (req:Request,res:Response) => {
  res.send('This is view page');
})

router.post('/register', async (req:Request,res:Response) => {
  const salt = await bcrypt.genSalt(10);

  const args = {
    email: req.body.email,
    pw: (await bcrypt.hash(req.body.pw, salt)).toString(),
    name: req.body.name
  }
  try {
    Register(args);
    res.send('no error')
  } catch (err) {
    res.status(500).send('internal')
  }
})

router.post('/login', async (req:Request,res:Response) => {
  const salt = await bcrypt.genSalt(10);

  const args = {
    email: req.body.email,
    pw: (await bcrypt.hash(req.body.pw, salt)).toString()
  }

  try {
    const DBstatus = await Login(args);
    const getDataFromDB = JSON.parse(JSON.stringify(DBstatus))[0]
    if (!getDataFromDB) {
      throw new Error('not vlalid email or pw')
    }
    const token = jwt.sign({email: args.email}, jwtObj.secret);
    res.header('auth-token',token).send('Logged in');
  } catch (err) {
    res.status(500).send('internal');
  }
});

module.exports = router;