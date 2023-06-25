/* eslint-disable no-console */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

const { PORT } = process.env;

mongoose.connect(process.env.DB_URL, { maxPoolSize: process.env.MONGO_POOLSIZE || 1 })
  .then(() => console.log('🟢 DB Connected!'))
  .then(() => app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}!`)))
  .catch((error) => console.log('🔴 There was an error on the DB connection method.', error));
