// use "import" to import libraries
import express from 'express';
import cors from 'cors';

// use "require" to import JSON files
const admins = require('./data/admins.json');
const activity = require('./data/activity.json');
const activityRouter = require('./resources/activity');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/activities', activityRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.get('/activities', (req, res) => {
  res.status(200).json({
    data: activity,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
