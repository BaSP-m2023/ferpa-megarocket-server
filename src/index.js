/* eslint-disable no-console */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

const { PORT } = process.env.PORT;

mongoose.connect(process.env.DB_URL, { maxPoolSize: process.env.MONGO_POOLSIZE || 1 })
  .then(() => console.log('🟢 DB Connected!'))
  .then(() => app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}!`)))
  .catch((error) => console.log('🔴 There was an error on the DB connection method.', error));

/* mongoose.connect(process.env.DB_URL, { maxPoolSize: process.env.MONGO_POOLSIZE || 1 })
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
 */

/* mongoose.connect(process.env.DB_URL, { maxPoolSize: process.env.MONGO_POOLSIZE || 1 })
  .then(() => {
    console.log('MongoDB connected');

    try {
      app.listen(process.env.PORT, (err) => {
        if (err) throw err;
        console.log(`server listening on port: ${process.env.PORT}`);
      });
    } catch (err) {
      console.log('There was an error starting the server: ', err);
    }
  })
  .catch((e) => console.log(e));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
 */
