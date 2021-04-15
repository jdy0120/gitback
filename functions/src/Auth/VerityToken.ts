import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtObj } from '../../_config/jwt-config';

/**
 * 토큰을 확인해주는 함수 미들웨어에 사용
 */
export const verify = (req:Request,res:Response,next:NextFunction) => {
  const token = req.body.body.loginToken;
  // 토큰이 없을 경우
  if (!token) {
    res.status(401).send('Access Denied');
  } else {
    // 받은 토큰이 올바를 경우
    try {
      const verified = jwt.verify(token , jwtObj.secret);
      req.user = verified;
      next();
    // 받은 토큰이 올바르지 않을 경우
    } catch (err) {
      res.status(400).send('Invalid Token');
    }
  }
};