const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const router = require('./routes');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const DB_URL = 'mongodb+srv://ferpa-team:sJMD9bZjg8Bq4ntf@megarocket-databases.inpprte.mongodb.net/ferpa-database';

mongoose
  .connect(DB_URL, { maxPoolSize: process.env.MONGO_POOLSIZE || 1 })
  .then(() => console.log('Mongo db connected'))
  .catch((error) => console.log('Error: ', error));

app.use('/api', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
