import { Request,Response } from 'express';

const Weather = (req:Request,res:Response) => {
  const { location } = req.body.body;
  
}

export default Weather;