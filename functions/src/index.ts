import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as functions from "firebase-functions";

import { fetchMyFriends, insertFriend } from './MyFriends/MyFriends';
import { fetchHoliday } from './Holiday/Holiday';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', fetchHoliday);
app.get('/Friends', fetchMyFriends);
app.put('/insertFriend', insertFriend);

export const getDatas = functions.https.onRequest(app);

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
