import express from 'express';
const controller = require('./controllers/eventsController');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('Hello World');
  res.send('Hello world');
})


router.get('/earthquakes/:sdate/:edate/:minM/:maxM', controller.getEvents);


export default router;