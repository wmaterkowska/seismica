import express from 'express';
import { Prisma } from '@prisma/client'

import { getEventFromDb, getEventsFromDb, saveEventToDb } from '../models/event';

export const getEventsToCompare = async (req: express.Request, res: express.Response) => {
  try {
    const userSub = req.auth?.payload.sub || '';

    if (userSub) {
      const events = await getEventsFromDb(userSub);
      res.status(200);
      res.send(events)
    } else {
      console.log('Error: Failed authentication.');
      res.sendStatus(401);
    }
  } catch (e) {
    console.log('Error', e);
    res.sendStatus(500);
  }
}


export const getEventByDate = async (req: express.Request, res: express.Response) => {
  try {
    const userSub = req.auth?.payload.sub || '';
    const date = String(req.params.date);

    if (userSub) {
      const events = await getEventFromDb(userSub, date);
      res.status(200);
      res.send(events)
    } else {
      console.log('Error: Failed authentication.');
      res.sendStatus(401);
    }
  } catch (e) {
    console.log('Error', e);
    res.sendStatus(500);
  }
}


export const postEventToCompare = async (req: express.Request<{}, {}, Prisma.EventCreateInput>, res: express.Response) => {
  try {
    const eventData = req.body;

    const userSub = req.auth?.payload.sub || '';

    const newEvent = await saveEventToDb(userSub, eventData);

    res.status(200);
    res.send(newEvent);
  } catch (e) {
    console.log('Error', e);
    res.sendStatus(500);
  }
}
