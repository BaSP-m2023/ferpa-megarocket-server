const mongoose = require('mongoose');

const { Schema } = mongoose;

const subSchema = new Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      require: true,
    },
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
  },
);

module.exports = mongoose.model('Subscription', subSchema);
