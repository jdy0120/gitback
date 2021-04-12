import { myPool } from '../_config/db';
import { RowDataPacket } from 'mysql2';
import { WeatherInfo } from '../types/types';

const checkDatabase = async (country_id:string): Promise<RowDataPacket[]> => {
  const myconn = await myPool.getConnection();
  try {
    const sql = `
      Select idx,lon,lat,w_main,description,temp,feels_like,temp_min,temp_max,sunrise,sunset,country_id,country_name
      from saveweather where country_id = ?;
    `;

    const params = [
    ];
    params.push(country_id);
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

const insertDatabase = async (): Promise<void> => {

}

const getWeatherData = async (): Promise<void> => {

}

export const sendWeatherData = async (location:string): Promise<void> => {
  const 
}