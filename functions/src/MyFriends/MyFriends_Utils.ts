import { myPool } from '../_config/db';
import { RowDataPacket } from 'mysql2';

export const getMyFriendsList = async (): Promise<any> => {
  try {
    const myconn = await myPool.getConnection();

    try {
      myconn.on('unhandledRejection', error => {
        console.log('unhandledRejection', error.message);
      })
  
      const sql = `
        Select * from myfriends
      `;
  
      const query = await myconn.format(sql);
  
      const [rows] = await myconn.query<RowDataPacket[]>(query);
  
      myconn.release();
  
      return rows;
    } catch (err) {
      myconn.release();
      console.log('오류 : getMyFriendsList ',err.message);
      throw new Error(err);
    }
  } catch (err) {
    throw new Error(err);
  }
};