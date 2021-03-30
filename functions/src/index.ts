import * as functions from "firebase-functions";
import { fetchHoliday } from "../../src/Holiday/Holiday"

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send(fetchHoliday);
});

export const greet = functions.https.onRequest((request, response) => {
  const { name } = request.body;
  response.send(`Hello ${name}`);
});

export const getHoliday = functions.https.onRequest(fetchHoliday);
