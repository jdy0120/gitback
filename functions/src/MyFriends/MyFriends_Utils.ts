import { myPool } from '../_config/db';
import { RowDataPacket } from 'mysql2';
import { MyFriend } from '../types/types';

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

export const putMyFriend = async (myFriend:MyFriend) => {
  try {
    const myconn = await myPool.getConnection();

    try {
      const sql = `
        insert into myfriends(name,age,nickname) values('${myFriend.name}','${myFriend.age}','${myFriend.nickname}')
      `;
      console.log('sql >> : ',sql);
      const query = await myconn.format(sql);

      const [rows] = await myconn.query<RowDataPacket[]>(query);

      myconn.release();
      return rows;
    } catch (err) {
      myconn.release();
      console.log('오류 : putMyFriend ',err.message);
      throw new Error(err);
    }
  } catch (err) {
    throw new Error(err);
  }
}

export const changeFriendInfo = async (myFriend:MyFriend) => {
  try {
    const myconn = await myPool.getConnection();

    try {
      const sql = `
        update myfriends set age=${myFriend.age}, nickname='${myFriend.nickname}' where name='${myFriend.name}'
      `;
      console.log('sql >> : ',sql);
      const query = await myconn.format(sql);

      const [rows] = await myconn.query<RowDataPacket[]>(query);

      myconn.release();

      return rows;
    } catch (err) {
      myconn.release();
      console.log('오류 : changeFriendInfo ',err.message);
      throw new Error(err);
    }
  } catch (err) {
    throw new Error(err);
  }
}