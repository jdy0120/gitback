import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as functions from "firebase-functions";

import { fetchMyFriends, insertFriend } from './MyFriends/MyFriends';

import { Weather } from './Weather/Weather';
import { fetchHoliday } from './Holiday/Holiday';
import { verify } from './Auth/VerityToken';
import { Calendar } from './Calendar/Calendar';

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
app.post('/Weather', Weather);
app.post('/Calendar', verify ,Calendar);

const authApp = express();

authApp.use(cors());
authApp.use(bodyParser.json());

const auth = require('./Auth/Auth');
authApp.use('/auth', auth);

export const getDatas = functions.https.onRequest(app);

export const authFunction = functions.https.onRequest(authApp);

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
