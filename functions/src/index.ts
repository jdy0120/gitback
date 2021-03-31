import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as functions from "firebase-functions";
import { fetchHoliday } from './Holiday/Holiday';

const app = express();
const main = express();

app.post('/', fetchHoliday);

main.use(cors());
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use('/fetchHoliday',app);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// import { fetchHoliday } from './Holiday/Holiday';
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const getHoliday = functions.https.onRequest(main);