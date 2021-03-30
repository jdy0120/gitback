import fetch from 'node-fetch';

const apis = {
  EndPoint:`http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo`,
  Enecoding:`Do%2BqAYkzRDsfuWpJN8MRsmQIXjK06hUAMvVReJqqT1MvyKvc%2Ft9eFJU19fHpZZ9j88%2BVYi9AgtBVgibkdVwhXA%3D%3D`
}

export const getHoliday = async(year:string) => {
  const response = await (await fetch(`${apis.EndPoint}?serviceKey=${apis.Enecoding}&solYear=${year}&_type=json`)).json();
  return await response.response.body.items;
}