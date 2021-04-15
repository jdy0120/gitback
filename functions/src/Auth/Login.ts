import { RowDataPacket } from "mysql2";
import { myPool } from '../../_config/db';

interface Props {
  email: string
  pw: string
}

/**
 * 회원 로그인해주는 함수
 */
export const Login = async (props:Props):Promise<RowDataPacket[]|undefined> => {
  const myconn = await myPool.getConnection();
  try {
    const sql = `
      Select * from users where email = ?;
    `;

    const params = [
      props.email
    ];

    params.push();
    const query = await myconn.format(sql,params);
  
    const [rows] = await myconn.query<RowDataPacket[]>(query);

    myconn.release();

    return rows;
  } catch (err) {
    console.log('오류 : Auth >> Login ', err.message)
    throw new Error(err);
  }
}