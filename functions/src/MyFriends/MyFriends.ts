import { Request, Response } from 'express';
import { changeFriendInfo, getMyFriendsList, putMyFriend } from './MyFriends_Utils';
import * as functions from "firebase-functions";

import { MyFriend } from '../types/types';

export const fetchMyFriends = async (req:Request, res:Response):Promise<void> => {

  try {
    const myFriendList: MyFriend[] = await getMyFriendsList();

    res.send(myFriendList);
  } catch (err) {
    res.status(500).send('internal');
  }
};

export const insertFriend = async (req:Request, res:Response):Promise<void> => {

  try {
    const myFriendList: MyFriend[] = await getMyFriendsList();
    functions.logger.info(req.body.body);
    const exist = myFriendList.filter((element:MyFriend) => element.name === req.body.body.friendInfo.name)
    const { friendInfo } = req.body.body;
    if (exist[0]) {
      const response = await changeFriendInfo(friendInfo);
      res.send(response);
    } else {
      const response = await putMyFriend(friendInfo);
      res.send(response);
    }
  } catch (err) {
    res.status(500).send('internal');
  }
}