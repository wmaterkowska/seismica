import express from 'express';
import { getEvents } from './controllers/eventsController';
// const controller = require('./controllers/eventsController');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('Hello World');
  res.send('Hello world');
})


router.get('/earthquakes/:sdate/:edate/:minM/:maxM', getEvents);


export default router;