import express from 'express';
import { Prisma } from '@prisma/client'

import { saveUserToDb } from '../models/user';

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

export { saveUser };