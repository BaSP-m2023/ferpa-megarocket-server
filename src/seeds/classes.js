import mongoose from 'mongoose';

export default [
  {
    _id: new mongoose.Types.ObjectId('6462d8c5afd4e4d023690d66'),
    day: 'Monday',
    hour: 15,
    trainerId: new mongoose.Types.ObjectId('64667332ecb50c522415bea5'),
    activityId: new mongoose.Types.ObjectId('64693ee0ed79af5a83aac57c'),
    slots: 2,
  },
  {
    _id: new mongoose.Types.ObjectId('6462d8c5afd4e4d023690d65'),
    day: 'Friday',
    hour: 10,
    trainerId: new mongoose.Types.ObjectId('64667332ecb50c522415bea3'),
    activityId: new mongoose.Types.ObjectId('646936a8c657bcbd138eaf3c'),
    slots: 5,
  },
  {
    _id: new mongoose.Types.ObjectId('6462d8c5afd4e4d023690d64'),
    day: 'Wednesday',
    hour: 12,
    trainerId: new mongoose.Types.ObjectId('64667332ecb50c522415bea8'),
    activityId: new mongoose.Types.ObjectId('64693ee0ed79af5a83aac57c'),
    slots: 6,
  },
];
