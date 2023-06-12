import express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import { getEvents, getEventData } from './controllers/eventsController';
import { validateAccessToken } from './middleware/auth0.middleware';
import { getEventsToCompare, postEventToCompare } from './controllers/comparisonController'
const router = express.Router();


router.get('/earthquakes/:sdate/:edate/:minM/:maxM', getEvents);
router.get('/eventData/:date', getEventData);
router.get('/comparison', validateAccessToken, getEventsToCompare);
router.post('/toCompare/:date', validateAccessToken, postEventToCompare);


export default router;