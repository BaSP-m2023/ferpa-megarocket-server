const mongoose = require('mongoose');

const { Schema } = mongoose;

const subSchema = new Schema(
  {
    classId: {
      type: String,
      require: true,
    },
    memberId: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
  },
);

module.exports = mongoose.model('Subscription', subSchema);
