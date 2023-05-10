// use "import" to import libraries
import express from 'express';
import cors from 'cors';

// use "require" to import JSON files
const admins = require('./data/admins.json');

const memberRouter = require('./resources/member');

const app = express();
const port = process.env.PORT || 4000;

const classesRouter = require('./resources/class');

const trainerRouter = require('./resources/trainer');

app.use(cors());
app.use(express.json());

app.use('/classes', classesRouter);

app.use('/members', memberRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.use('/trainers', trainerRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
