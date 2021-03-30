import express, {Application,Request,Response,NextFunction} from 'express';
import { fetchHoliday } from './Holiday/Holiday';
import bodyParser from 'body-parser';
import cors from 'cors';

const app:Application = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req:Request, res:Response, next:NextFunction) => {
  res.send('Hello');
});

app.post('/fetchHoliday', fetchHoliday);

app.listen(5050, () => {
  console.log('Server Running');
});