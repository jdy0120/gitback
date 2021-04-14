import { Request,Response } from 'express';

const router = require('express').Router();

router.get('/view', (req:Request,res:Response) => {
  res.send('This is view page')
})

module.exports = router;