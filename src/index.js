/* eslint-disable no-console */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

mongoose.connect(process.env.MONGO_DB_CONNECT_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((e) => console.log(e));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

try {
  app.listen(process.env.PORT, (error) => {
    if (error) throw error;
    console.log(`Server listening on port: ${process.env.PORT}`);
  });
} catch (error) {
  console.log('There was an error starting the server: ', error);
}
