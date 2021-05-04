import { Request, Response } from 'express';

import { getHoliday } from './Holiday_Utils';

// interface Data {
//   year: string;
// }

export const fetchHoliday = async (req: Request, res: Response): Promise<void> => {
  try {
    const { year } = req.body.body;
    const holidayList = await getHoliday(year);
    res.send({ holidayList });
  } catch (err) {
    console.log('오류 : getHoliday', err.message);
    throw err;
  }
};