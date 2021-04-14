import { Request, Response } from 'express';

import { sendWeatherData } from './Weather_Utils';
import * as functions from "firebase-functions";

/**
 * 프론트에서 직접 api를 받아 내용을 출력할 수도 있지만 굳이 api를 개발한 이유
 * 1. 프론트를 https인 주소로 호스팅할 경우 호스팅된https 주소에서 날씨정보를 제공하는 http인 api를 호출할 수 없다.
 * 2. 날씨 정보 api에 접근할 수 있는 개인key를 숨길 수 있다.
 * 3. firebase에 배포할 경우 특정 주소에만 api호출을 허가할 수 있어 보안에 좋다.
 */
export const Weather = async (req:Request,res:Response): Promise<void> => {
  const { location } = req.body.body;
  functions.logger.info(location);
  try {
    const locdata = await sendWeatherData(location);
    res.send(locdata);
  } catch(err) {
    console.log('err >> ',err.message);
    switch (err.message) {
      // 찾을 수 없는 지역일 경우
      case 'Request failed with status code 404':
        res.status(404).send('Request failed with status code 404');
        break;
      // 한글로 들어온 모르는 지역일 경우
      case 'Request path contains unescaped characters':
        res.status(501).send('Request path contains unescaped characters');
      default:
        res.status(500).send({status:500, message: 'internal error', type:'internal'});
        break;
    }
  }
}