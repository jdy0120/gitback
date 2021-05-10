import * as moment from 'moment-timezone';

import { Day, EventInfo } from '../types/types';

import { RowDataPacket } from 'mysql2';
import { myPool } from '../../_config/db';

moment().tz("Asia/Seoul").format();

require('dotenv').config();

/**
 * events테이블에 있는 정보를 뽑아주는 함수
 */
export const getEvents = async () => {
  const myconn = await myPool.getConnection();
  try {

    const sql = `
      Select users.email,users.name,events.idx,events.title,events.content,users.color,date_format(events.date,'%Y-%m-%d') as date, date_format(events.date,'%T') as time
      from events,users 
      where events.email=users.email;
    `;

    const query = await myconn.format(sql);

    const [rows] = await myconn.query<RowDataPacket[]>(query);

    myconn.release();

    return rows;
  } catch (err) {
    throw new Error(err);
  }
}

/**
 * events테이블에 이벤트를 등록해주는 함수
 */
export const insertEvent = async (eventInfo: EventInfo) => {
  const myconn = await myPool.getConnection();
  try {

    const sql = `
      insert into events(title,content,email,date)
      values(?,?,?,date_format(?, '%Y-%m-%d %T'));
    `;

    const params = [
      eventInfo.title,
      eventInfo.content,
      eventInfo.email,
      eventInfo.date
    ]

    const query = await myconn.format(sql, params);

    console.log(query);

    const [rows] = await myconn.query<RowDataPacket[]>(query);

    myconn.release();

    return rows;
  } catch (err) {
    throw new Error(err);
  }
}

/**
 * events테이블의 내용을 업데이트해주는 함수
 */
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

/**
 * events테이블의 내용을 삭제해주는 함수
 */
export const deleteEvent = async (eventInfo: EventInfo) => {
  const myconn = await myPool.getConnection();
  try {

    const sql = `
      Delete from events where idx=?;
    `;

    const params = [
      eventInfo.idx
    ]

    const query = await myconn.format(sql, params);

    const [rows] = await myconn.query<RowDataPacket[]>(query);

    myconn.release();

    return rows;
  } catch (err) {
    throw new Error(err);
  }
}

/**
 * 유저가 선택한 이벤트를 바꿔주는 함수 Dday를 계산할 때 사용한다.
 */
export const choiceEvent = async (eventInfo: EventInfo) => {
  const myconn = await myPool.getConnection();
  try {

    const sql = `
      Update users set choiceEvent = ? where email = ?;
    `;

    const params = [
      eventInfo.idx,
      eventInfo.email
    ]

    const query = await myconn.format(sql, params);

    const [rows] = await myconn.query<RowDataPacket[]>(query);

    myconn.release();

    return rows;
  } catch (err) {
    throw new Error(err);
  }
}