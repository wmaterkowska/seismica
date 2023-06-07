import express from 'express';
import { getEarthquakesData } from '../services/eventsService';
// const service = require('../services/eventsService');

export const getEvents = async (req: express.Request, res: express.Response) => {
  try {
    let earthquakesData = await getEarthquakesData();
    res.status(200);
    res.send(earthquakesData);
  } catch {
    res.status(400);
    res.send('Getting data from API failed.')
  }
}
