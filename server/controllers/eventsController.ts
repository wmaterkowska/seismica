import express from 'express';
import { getEarthquakesData } from '../services/eventsService';
import { getEarthquakeData } from '../services/eventService';

// API service: http://service.iris.edu/

// get request to get data from IRIS API of all earthquakes from sdate to edate with magnitudes from minM to maxM
export const getEvents = async (req: express.Request, res: express.Response) => {
  try {
    const { sdate, edate, minM, maxM } = req.params;
    let earthquakesData = await getEarthquakesData(sdate, edate, minM, maxM);

    res.status(200);
    res.send(earthquakesData);
  } catch {
    res.status(400);
    res.send('Getting data from API failed.')
  }
}

// get request to get wave data from IRIS API of single earthquake
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