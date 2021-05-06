import { RowDataPacket } from 'mysql2';
import { color } from '../_assets/color';
import { myPool } from '../../_config/db';

interface Props {
  email: string,
  name: string,
  pw: string
}

/**
 * 회원가입을 함과 동시에 색을 부여해준다.
 * 여기서 선택된 색은 일정을 저장할 때 누구의 일정인지 구분해준다.
 */
export const pickColor = (color: string[]): string => {
  const ranIndex: number = Math.floor(Math.random() * color.length);
  return color[ranIndex];
}

/**
 * 회원 등록해주는 함수
 */
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