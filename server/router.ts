import express from 'express';
import { getEvents, getEventData } from './controllers/irisApiController';
import { validateAccessToken } from './middleware/auth0.middleware';
import { getEventsToCompare, postEventToCompare } from './controllers/eventsController'
import { getUser, saveUser } from './controllers/userController';

const router = express.Router();


router.get('/earthquakes/:sdate/:edate/:minM/:maxM', getEvents);
router.get('/eventData/:date', getEventData);

router.get('/comparison', validateAccessToken, getEventsToCompare);
router.post('/toCompare/:date', validateAccessToken, postEventToCompare);

// router.post('/login'); // on login send request for token when user is in database
// router.post('/signup', saveUser);
// router.post('/logout', validateAccessToken);

router.get('/user', validateAccessToken, getUser);
router.post('/user', validateAccessToken, saveUser);


export default router;