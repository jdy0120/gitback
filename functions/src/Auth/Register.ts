import { RowDataPacket } from 'mysql2';
// import * as jwt from 'jsonwebtoken';
import { myPool } from '../../_config/db';

interface Props {
  email : string,
  name : string,
  pw : string
}

export const Register = async (props:Props): Promise<void> => {
  const myconn = await myPool.getConnection();
  try {
    const sql = `
      Insert into users(email,pw,name) values(?,?,?);
    `;

    const params = [
      props.email,
      props.pw,
      props.name
    ];
    params.push();
    const query = await myconn.format(sql,params);
  
    await myconn.query<RowDataPacket[]>(query);

    myconn.release();
  } catch (err) {
    console.log('오류 : Auth >> Register ', err.message);
    throw new Error(err);
  }
}