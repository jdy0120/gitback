import fetch from 'node-fetch';

const apis = {
  EndPoint: `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo`,
  Enecoding: process.env.HOLIDAY_API_KEY
}

/**
 * 해당 연도에 존재하는 모든 공휴일을 fetch 해준다
 */
export const getHoliday = async (year: string) => {
  console.log(year)
  const response = await (await fetch(`${apis.EndPoint}?serviceKey=${apis.Enecoding}&solYear=${year}&numOfRows=100&_type=json`)).json();
  console.log(response)
  return await response.response.body.items;
}