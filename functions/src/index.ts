import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as functions from "firebase-functions";

import { fetchMyFriends, insertFriend } from './MyFriends/MyFriends';

import { Weather } from './Weather/Weather';
import { fetchHoliday } from './Holiday/Holiday';
import { getCalendarEvents } from './Calendar/Calendar';
import { verify } from './Auth/VerityToken';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', fetchHoliday);
app.get('/Friends', fetchMyFriends);
app.put('/insertFriend', insertFriend);
app.post('/Weather', Weather);
// Calendar는 token이 있어야 호출할 수 있다.
app.post('/Calendar', verify, getCalendarEvents);

/**
 * authApp은 로그인, 회원가입, 미들웨어 인증을 담당하는 api
 */
const authApp = express();

authApp.use(cors({
  // origin: "https://jdy0120.github.io",
  origin: 'http://localhost:3000',
  credentials: true
}));
authApp.use(bodyParser.json());
authApp.use(bodyParser.urlencoded({ extended: false }));

const auth = require('./Auth/Auth');
authApp.use('/auth', auth);

export const getDatas = functions.https.onRequest(app);

export const authFunction = functions.https.onRequest(authApp);

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
