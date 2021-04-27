import { RowDataPacket } from 'mysql2';
// import * as jwt from 'jsonwebtoken';
import { myPool } from '../../_config/db';
import { color } from '../_assets/color';

interface Props {
  email: string,
  name: string,
  pw: string
}
/**
 * 회원 등록해주는 함수
 */

export const pickColor = (color: string[]): string => {
  const ranIndex: number = Math.floor(Math.random() * color.length);
  return color[ranIndex];
}

export const Register = async (props: Props): Promise<void> => {
  const myconn = await myPool.getConnection();
  try {
    const sql = `
      Insert into users(email,pw,color,name) values(?,?,?,?);
    `;

    const params = [
      props.email,
      props.pw,
      pickColor(color),
      props.name
    ];
    params.push();
    const query = await myconn.format(sql, params);
    console.log(query);
    await myconn.query<RowDataPacket[]>(query);

    myconn.release();
  } catch (err) {
    console.log('오류 : Auth >> Register ', err.message);
    throw new Error(err);
  }
}