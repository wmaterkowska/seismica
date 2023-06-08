import express from 'express';
import { getEvents, getEventData } from './controllers/eventsController';

const router = express.Router();


router.get('/earthquakes/:sdate/:edate/:minM/:maxM', getEvents);
router.get('/eventData/:date', getEventData);


export default router;