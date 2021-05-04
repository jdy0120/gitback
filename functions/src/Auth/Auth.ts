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

/**
 * 프로젝트에 쓰이지 않는 router입니다.
 * router연습용 api 
 */
router.get('/view', (req: Request, res: Response) => {
  res.send('This is view page');
})

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
    if (err.message === `Error: Duplicate entry '${args.email}' for key 'PRIMARY'`) {
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
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const args = {
    email: req.body.body.email,
    pw: req.body.body.pw
  }
  try {
    const DBstatus = await Login(args);
    const getDataFromDB = JSON.parse(JSON.stringify(DBstatus))[0];
    // 데이터베이스에 일치하는 email이 없을 경우
    if (!getDataFromDB) {
      res.status(403).send('Not valid email');
      res.end();
    }
    // 데이터베이스에 저장된 pw와 클라이언트로부터 받은 pw를 비교
    console.log('compare >>', JSON.stringify(await bcrypt.compare(args.pw, getDataFromDB.pw)));
    // 비밀번호가 틀릴경우
    if (!await bcrypt.compare(args.pw, getDataFromDB.pw)) {
      res.status(403).send('Not valid password');
      // 비밀번호가 맞을경우
    } else {
      const token = jwt.sign({ email: args.email, name: getDataFromDB.name, color: getDataFromDB.color, choiceEvent: getDataFromDB.choiceEvent }, jwtObj.secret);
      res.json({
        loginToken: token,
        maxAge: 60000
      });
      res.end();
    }
  } catch (err) {
    res.status(500).send('internal');
  }
});

module.exports = router;