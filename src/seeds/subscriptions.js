import mongoose from 'mongoose';

const currentDate = new Date();

const outOfWeekDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate() - currentDate.getDay() + 14,
);

export default [
  {
    _id: new mongoose.Types.ObjectId('64693ee0ed79af5a83aac57c'),
    classId: new mongoose.Types.ObjectId('6462d8c5afd4e4d023690d66'),
    memberId: new mongoose.Types.ObjectId('6462439ab74486265babed70'),
    date: new Date(),
    __v: 0,
  },
  {
    _id: new mongoose.Types.ObjectId('646936a8c657bcbd138eaf3c'),
    classId: new mongoose.Types.ObjectId('6462d8c5afd4e4d023690d65'),
    memberId: new mongoose.Types.ObjectId('646243a5b74486265babed72'),
    date: outOfWeekDate,
    __v: 3,
  },
];
