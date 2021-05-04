import * as functions from "firebase-functions";

import { Request, Response } from 'express';
import { changeFriendInfo, getMyFriendsList, insertMyFriend } from './MyFriends_Utils';

import { MyFriend } from '../types/types';

/**
 * 친구정보를 클라이언트에게 보내주는 함수
 */
export const fetchMyFriends = async (req: Request, res: Response): Promise<void> => {

  try {
    const myFriendList: MyFriend[] = await getMyFriendsList();

    res.send(myFriendList);
  } catch (err) {
    res.status(500).send('internal');
  }
};

/**
 * 클라이언트로부터 받은 데이터를 토대로 데이터베이스에 친구정보가 있다면 수정, 없다면 저장을 해준다.
 */
export const insertFriend = async (req: Request, res: Response): Promise<void> => {

  try {
    const myFriendList: MyFriend[] = await getMyFriendsList();
    functions.logger.info(req.body.body);
    const exist = myFriendList.filter((element: MyFriend) => element.name === req.body.body.friendInfo.name)
    const { friendInfo } = req.body.body;
    // 클라이언트로부터 받은 친구정보가 데이터베이스에 있는경우
    if (exist[0]) {
      const response = await changeFriendInfo(friendInfo);
      res.send(response);
      // 클라이언트로부터 받은 친구정보가 데이터베이스에 없는경우
    } else {
      const response = await insertMyFriend(friendInfo);
      res.send(response);
    }
  } catch (err) {
    res.status(500).send('internal');
  }
}