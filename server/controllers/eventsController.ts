import express from 'express';
const service = require('../services/eventsService');

exports.getEvents = async (req: express.Request, res: express.Response) => {
  try {
    let earthquakesData = await service.getEarthquakesData(req);
    res.status(200);
    res.send(earthquakesData);
  } catch {
    res.status(400);
    res.send('Getting data from API failed.')
  }
}
