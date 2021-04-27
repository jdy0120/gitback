import { Request, Response } from 'express';
import { getEvents } from './Calendar_Utils';
export const getCalendarEvents = async (req: Request, res: Response) => {
  const { ...day } = req.body.body;
  console.log(day);
  try {
    const events = await getEvents(day);
    console.log(JSON.stringify(events))
    res.send(events);
  } catch (err) {
    res.status(500).send('Internal');
  }
}