import mongoose from 'mongoose';

export default [
  {
    _id: new mongoose.Types.ObjectId('6462d8c5afd4e4d023690d66'),
    day: 'Monday',
    hour: 15,
    trainerId: new mongoose.Types.ObjectId('6465a78f192b0cfa3aaa8f92'),
    activityId: new mongoose.Types.ObjectId('646696cc4cbfe1552edfbea8'),
    slots: 2,
  },
  {
    _id: new mongoose.Types.ObjectId('6462d8c5afd4e4d023690d65'),
    day: 'Friday',
    hour: 10,
    trainerId: new mongoose.Types.ObjectId('6466734becb50c522415bea9'),
    activityId: new mongoose.Types.ObjectId('6465a78f192b0cfa3aaa8f91'),
    slots: 5,
  },
  {
    _id: new mongoose.Types.ObjectId('6462d8c5afd4e4d023690d64'),
    day: 'Wednesday',
    hour: 12,
    trainerId: new mongoose.Types.ObjectId('64667332ecb50c522415bea5'),
    activityId: new mongoose.Types.ObjectId('646798af48689417f301fdad'),
    slots: 6,
  },
];
