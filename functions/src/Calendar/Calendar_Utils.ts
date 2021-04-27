import { myPool } from '../../_config/db';
import { RowDataPacket } from 'mysql2';
import { Day, EventInfo } from '../types/types';
import * as moment from 'moment-timezone';

require('dotenv').config();

export const getEvents = async (day: Day) => {
  const myconn = await myPool.getConnection();
  try {

    const sql = `
      Select users.email,events.idx,events.title,events.content,users.color,events.date 
      from events,users 
      where events.email=users.email and DATE_FORMAT(events.date, '%Y-%m') = ?;
    `;

    const params = [
      moment(day.year.toString() + '-' + day.month.toString()).format('YYYY-MM')
    ]

    const query = await myconn.format(sql, params);

    const [rows] = await myconn.query<RowDataPacket[]>(query);

    myconn.release();

    return rows;
  } catch (err) {
    throw new Error(err);
  }
}

export const registEvent = async (eventInfo: EventInfo, day: Day) => {
  const myconn = await myPool.getConnection();
  try {

    const sql = `
      Insert into events(title,content,email,date) values(?,?,?,DATE_FORMAT());
    `;

    const params = [
      eventInfo.title,
      eventInfo.content,
      eventInfo.email,
      day
    ]

    const query = await myconn.format(sql, params);

    const [rows] = await myconn.query<RowDataPacket[]>(query);

    myconn.release();

    return rows;
  } catch (err) {
    throw new Error(err);
  }
}

export const updateEvent = async (eventInfo: EventInfo, day: Day) => {
  const myconn = await myPool.getConnection();
  try {

    const sql = `
      Update
    `;

    const params = [
      eventInfo.title,
      eventInfo.content,
      eventInfo.email,
      day
    ]

    const query = await myconn.format(sql, params);

    const [rows] = await myconn.query<RowDataPacket[]>(query);

    myconn.release();

    return rows;
  } catch (err) {
    throw new Error(err);
  }
}

export const deleteEvent = async (eventInfo: EventInfo, day: Day) => {
  const myconn = await myPool.getConnection();
  try {

    const sql = `
      Delete
    `;

    const params = [
      eventInfo.title,
      eventInfo.content,
      eventInfo.email,
      day
    ]

    const query = await myconn.format(sql, params);

    const [rows] = await myconn.query<RowDataPacket[]>(query);

    myconn.release();

    return rows;
  } catch (err) {
    throw new Error(err);
  }
}