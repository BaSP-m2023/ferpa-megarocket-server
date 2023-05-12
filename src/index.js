import express from 'express';
import cors from 'cors';

const activityRouter = require('./resources/activity');
const trainerRouter = require('./resources/trainer');
const adminsRouter = require('./resources/admins');
const classesRouter = require('./resources/class');
const memberRouter = require('./resources/member');
const subscriptionRouter = require('./resources/subscription');
const sAdmins = require('./resources/super-admins');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/activities', activityRouter);
app.use('/admins', adminsRouter);
app.use('/classes', classesRouter);
app.use('/members', memberRouter);
app.use('/trainers', trainerRouter);
app.use('/subscriptions', subscriptionRouter);
app.use('/super-admins', sAdmins);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
