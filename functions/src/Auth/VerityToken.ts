import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtObj } from '../../_config/jwt-config';

export const verify = (req:Request,res:Response,next:NextFunction) => {
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send('Access Denied');
  } else {
    try {
      const verified = jwt.verify(token , jwtObj.secret);
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).send('Invalid Token');
    }
  }
};