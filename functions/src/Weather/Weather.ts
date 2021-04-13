import { Request, Response } from 'express';

import { sendWeatherData } from './Weather_Utils';
import * as functions from "firebase-functions";

export const Weather = async (req:Request,res:Response): Promise<void> => {
  const { location } = req.body.body;
  functions.logger.info(location);
  try {
    const locdata = await sendWeatherData(location);
    res.send(locdata);
  } catch(err) {
    res.status(500).send('internal');
  }
}