const mongoose = require('mongoose');

const { Schema } = mongoose;

const subSchema = new Schema(
  {
    classId: {
      type: Number,
      require: true,
    },
    memberId: {
      type: Number,
      require: true,
    },
    date: {
      type: String,
      require: true,
    },
  },
);

module.exports = mongoose.model('Subscription', subSchema);
