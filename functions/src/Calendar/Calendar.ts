import { Request, Response } from 'express';
import { choiceEvent, deleteEvent, getEvents, insertEvent } from './Calendar_Utils';

/**
 * 프론트엔드에서 보낸 division에 따라 Calendar_Utils에 있는 함수를 다르게 적용한다.
 */
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