import * as functions from "firebase-functions";
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';

import { fetchHoliday } from './Holiday/Holiday';
import { fetchMyFriends } from './MyFriends/MyFriends';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/', fetchHoliday);
app.get('/Friends', fetchMyFriends);

export const getDatas = functions.https.onRequest(app);

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
