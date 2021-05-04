import { myPool } from '../../_config/db';
import { RowDataPacket } from 'mysql2';
import { WeatherInfo } from '../types/types';
import * as moment from 'moment';
import axios from 'axios';

/**
 * fetch할 주소 지역이름을 입력하면 그 지역에 대한 날씨정보를 받아올 수 있다.
 */
const API = {
  url: `http://api.openweathermap.org/data/2.5/weather?q=`,
  key: process.env.WEATHER_API_KEY,
}

/**
 * weatherData의 종류를 식별하여 string타입으로 리턴해준다.
 */
const responseType = (weatherData: WeatherInfo | undefined): string => {
  // 데이터베이스에 검색한 지역의 날씨정보가 저장되지 않았을 경우
  if (!weatherData) return 'notExistData'
  // 데이터베이스에 검색한 지역의 날씨정보가 있지만, 날씨정보가 저장한지 60초가 넘은 구형정보일 경우
  else if (moment().unix() - moment(weatherData.createdAt).unix() > 60) return 'canNotUseData'
  // 데이터베이스에 저장된 날씨정보가 사용가능한 날씨정보일 경우
  else return 'canUseData'
}

/**
 * 데이터베이스에 데이터가 저장되어있는지 확인해주는 함수
 */
const checkDatabase = async (country_name: string): Promise<RowDataPacket[]> => {
  const myconn = await myPool.getConnection();
  try {
    // 데이터베이스에 저장된 country_name에 대한 날씨정보 출력
    const sql = `
      Select idx, lon, lat, w_main, description, temp, feels_like, temp_min, temp_max, sunrise, sunset, country_id, country_name, createdAt
      from saveweather where country_name = ?;
    `;

    const params = [
    ];
    params.push(country_name);
    const query = await myconn.format(sql, params);

    const [rows] = await myconn.query<RowDataPacket[]>(query);

    myconn.release();

    return rows;
  } catch (err) {
    myconn.release();
    console.log('오류 : Weather_Utils >> checkDatabase ', err.message);
    throw new Error(err);
  }
}

/**
 * 데이터베이스에 날씨정보가 없을 경우 지역에 대한 날씨정보를 저장하는 함수
 */
const insertDatabase = async (weatherData: WeatherInfo): Promise<RowDataPacket[]> => {
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

    const query = await myconn.format(sql, params);

    const [rows] = await myconn.query<RowDataPacket[]>(query);

    myconn.release();

    return rows;
  } catch (err) {
    myconn.release();
    console.log('오류 : Weather_Utils >> insertDatabase ', err.message);
    throw new Error(err);
  }
}

/**
 * 데이터베이스에 저장된 날씨정보가 오랜시간(60초)이 지났을 경우 데이터베이스에 날씨정보를 업데이트해준다.
 */
const updateDatabase = async (weatherData: WeatherInfo): Promise<RowDataPacket[]> => {
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

    const query = await myconn.format(sql, params);
    const [rows] = await myconn.query<RowDataPacket[]>(query);

    myconn.release();

    return rows;
  } catch (err) {
    myconn.release();
    console.log('오류 : Weather_Utils >> updateDatabase ', err.message);
    throw new Error(err);
  }
}

/**
 * axios를 통해 지역의 날씨정보를 가져온다.
 */
const getWeatherData = async (location: string): Promise<WeatherInfo> => {
  try {
    const response = await axios.get(`${API.url}${location}${API.key}`);
    const data = response.data;
    return {
      lon: data.coord.lon,
      lat: data.coord.lat,
      w_main: data.weather[0].main,
      description: data.weather[0].description,
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      country_id: data.id,
      country_name: data.name,
    };
  } catch (err) {
    console.log('오류 : Weather_Utils >> getWeatherData ', err.message);
    throw new Error(err.message);
  }
};

/**
 * client에게서 받아온 location이라는 변수를 이용하여 client에게 다시 날씨정보를 리턴해주는 함수
 */
export const sendWeatherData = async (location: string): Promise<WeatherInfo | undefined> => {
  const DBdata = await checkDatabase(location);
  const weatherData = JSON.parse(JSON.stringify(DBdata));
  switch (responseType(weatherData[0])) {

    case 'notExistData': {
      const locData = await getWeatherData(location);
      await insertDatabase(locData);
      return locData;
    }

    case 'canNotUseData': {
      const locData = await getWeatherData(location);
      await updateDatabase(locData);
      return locData;
    }

    case 'canUseData':
      /**
       * idx와 createdAt을 뺀 날씨 정보를 보낸다.
       * notExistData일때와 canNotUseData일 경우 idx와 createdAt이 포함되지 않기 때문에 프론트엔드가
       * 데이터를 처리하기 힘들 수 있다.
       */
      const { idx, createdAt, ...locData } = weatherData[0];
      return locData;
    default:
      throw new Error('오류 : sendWeatherData');
  }
}