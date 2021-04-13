import { myPool } from '../_config/db';
import { RowDataPacket } from 'mysql2';
import { WeatherInfo } from '../types/types';
import * as moment from 'moment';
import axios from 'axios';

const API = {
  url: `http://api.openweathermap.org/data/2.5/weather?q=`,
  key: `&appid=2bcb224c8994aa4f15decf03210cbe1d`,
}

const responseType = (weatherData: WeatherInfo|undefined): string => {
  if (!weatherData) return 'notExistData'
  else if (moment().unix()-moment(weatherData.createdAt).unix() > 60) return 'canNotUseData'
  else return 'canUseData'
}

const checkDatabase = async (country_name:string): Promise<RowDataPacket[]> => {
  const myconn = await myPool.getConnection();
  try {
    const sql = `
      Select idx, lon, lat, w_main, description, temp, feels_like, temp_min, temp_max, sunrise, sunset, country_id, country_name, createdAt
      from saveweather where country_name = ?;
    `;

    const params = [
    ];
    params.push(country_name);
    const query = await myconn.format(sql,params);
  
    const [rows] = await myconn.query<RowDataPacket[]>(query);

    myconn.release();

    return rows;
  } catch (err) {
    myconn.release();
    console.log('오류 : Weather_Utils >> checkDatabase ',err.message);
    throw new Error(err);
  }
}

const insertDatabase = async (weatherData:WeatherInfo): Promise<RowDataPacket[]> => {
  console.log('weatherData >> ', weatherData);
  const myconn = await myPool.getConnection();
  try {
    const sql = `
      insert into saveweather(lon, lat, w_main, description, temp, feels_like, temp_min, temp_max, sunrise, sunset, country_id, country_name)
      values(?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    const params = [
      weatherData.lon,
      weatherData.lat,
      weatherData.w_main,
      weatherData.description,
      weatherData.temp,
      weatherData.feels_like,
      weatherData.temp_min,
      weatherData.temp_max,
      weatherData.sunrise,
      weatherData.sunset,
      weatherData.country_id,
      weatherData.country_name,
    ];
    const query = await myconn.format(sql,params);
    
    const [rows] = await myconn.query<RowDataPacket[]>(query);

    myconn.release();

    return rows;
  } catch (err) {
    myconn.release();
    console.log('오류 : Weather_Utils >> insertDatabase ',err.message);
    throw new Error(err);
  }
}

const updateDatabase = async (weatherData:WeatherInfo): Promise<RowDataPacket[]> => {
  const myconn = await myPool.getConnection();
  try {
    const sql = `
      Update saveweather set lon = ?, lat = ?, w_main = ?, description = ?, temp = ?, feels_like = ?, temp_min = ?, temp_max = ?, sunrise = ?, sunset = ?, country_id = ?, country_name = ?, createdAt = ?
      where country_name = ?
    `;

    const params = [
      weatherData.lon,
      weatherData.lat,
      weatherData.w_main,
      weatherData.description,
      weatherData.temp,
      weatherData.feels_like,
      weatherData.temp_min,
      weatherData.temp_max,
      weatherData.sunrise,
      weatherData.sunset,
      weatherData.country_id,
      weatherData.country_name,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      weatherData.country_name,
    ];
    const query = await myconn.format(sql,params);
    const [rows] = await myconn.query<RowDataPacket[]>(query);

    myconn.release();

    return rows;
  } catch (err) {
    myconn.release();
    console.log('오류 : Weather_Utils >> updateDatabase ',err.message);
    throw new Error(err);
  }
}

const getWeatherData = async (location:string): Promise<WeatherInfo> => {
  const response = await axios.get(`${API.url}${location}${API.key}`);
  const data = response.data;
  return {
    lon: data.coord.lon,
    lat: data.coord.lat,
    w_main: data.weather[0].main,
    description: data.weather[1].description,
    temp: data.main.temp,
    feels_like: data.main.feels_like,
    temp_min: data.main.temp_min,
    temp_max: data.main.temp_max,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    country_id: data.id,
    country_name: data.name,
  };
};

export const sendWeatherData = async (location:string): Promise<WeatherInfo|undefined> => {
  const DBdata = await checkDatabase(location);
  const weatherData = JSON.parse(JSON.stringify(DBdata));
  switch (responseType(weatherData[0])) {
    case 'notExistData':
      const locData = await getWeatherData(location);
      await insertDatabase(locData);
      return locData;
    // locData를 const했기 때문에 canNotUseData에서 locData를 사용하지 못한다. 1을 붙였는데 센스있게 바꿔보자
    case 'canNotUseData':
      const locData1 = await getWeatherData(location);
      await updateDatabase(locData1);
      return locData1;
    case 'canUseData':
      return weatherData[0];
    default:
      throw new Error('오류 : sendWeatherData');
  }
}