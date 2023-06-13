import express from 'express';
import { Prisma } from '@prisma/client'

import { getUserFromDb, saveUserToDb } from '../models/user';

async function saveUser(req: express.Request<{}, {}, Prisma.UserCreateInput>, res: express.Response) {
  try {
    const userData = req.body;
    const newUser = await saveUserToDb(userData);

    res.status(201);
    res.send(newUser);
    console.log('new user created');
  } catch (e) {
    console.log('Error: ', e);
    res.sendStatus(500);
    console.log('error');
  }
};


async function getUser(req: express.Request, res: express.Response) {
  try {
    const userSub = req.auth?.payload.sub || '';

    if (userSub) {
      const user = await getUserFromDb(userSub);
      res.status(200);
      res.send(user);
    } else {
      console.log('Error: Failed authentication.');
      res.sendStatus(401);
    }
  } catch (e) {
    console.log('Error', e);
    res.sendStatus(500);
  }
}



export { saveUser, getUser };