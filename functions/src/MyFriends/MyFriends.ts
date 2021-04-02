import { Request, Response } from 'express';

import { MyFriend } from '../types/types';
import { getMyFriendsList } from './MyFriends_Utils';

export const fetchMyFriends = async (req:Request, res:Response):Promise<void> => {

  try {
    const myFriendList: MyFriend[] = await getMyFriendsList();

    res.send(myFriendList);
  } catch (err) {
    res.status(500).send('internal');
  }
};