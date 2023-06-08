import express from 'express';
import { getEarthquakesData } from '../services/eventsService';
import { getEarthquakeData } from '../services/eventService';

export const getEvents = async (req: express.Request, res: express.Response) => {
  try {
    const { sdate, edate, minM, maxM } = req.params;
    // console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++')
    // console.log(sdate, edate, minM, maxM);
    let earthquakesData = await getEarthquakesData(sdate, edate, minM, maxM);

    res.status(200);
    // console.log(earthquakesData);
    res.send({ earthquakesData });
  } catch {
    res.status(400);
    res.send('Getting data from API failed.')
  }
}

export const getEventData = async (req: express.Request, res: express.Response) => {
  try {
    const { date } = req.params;
    let eventData = await getEarthquakeData(date);

    res.status(200);
    res.send({ eventData });
  } catch {
    res.status(400);
    res.send('Getting data from API failed.')
  }

}