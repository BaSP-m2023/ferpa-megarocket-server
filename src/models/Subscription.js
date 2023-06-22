const mongoose = require('mongoose');

const { Schema } = mongoose;

const subSchema = new Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
);

module.exports = mongoose.model('Subscription', subSchema);
