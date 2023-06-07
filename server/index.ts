import express from 'express';
import router from './router';

const app: express.Application = express();

const PORT: number = 3000;

app.use(router);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
});