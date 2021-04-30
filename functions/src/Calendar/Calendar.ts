import { Request, Response } from 'express';
import { getEvents, insertEvent, deleteEvent, choiceEvent } from './Calendar_Utils';
export const getCalendarEvents = async (req: Request, res: Response) => {
  const { division, ...eventInfo } = req.body.body;

  try {
    switch (division) {
      case 'getEvents': {
        const events = await getEvents();
        console.log(JSON.stringify(events))
        res.send(events);
        break;
      }

      case 'insertEvent': {
        const response = await insertEvent(eventInfo);
        console.log(JSON.stringify(response))
        res.send(response);
        break;
      }

      case 'updateEvent': {
        break;
      }

      case 'deleteEvent': {
        const response = await deleteEvent(eventInfo);
        console.log(JSON.stringify(response))
        res.send(response)
        break;
      }
      case 'choiceEvent': {
        const response = await choiceEvent(eventInfo);
        console.log(JSON.stringify(response))
        res.send(response)
        break;
      }
      default: {
        res.send('not valid division');
      }
    }

  } catch (err) {
    res.status(500).send('Internal');
  }
}