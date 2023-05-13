const mongoose = require('mongoose');

const { Schema } = mongoose;

const subSchema = new Schema(
  {
    class: {
      type: Number,
      require: true,
    },
    member: {
      type: Number,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
  },
);

module.exports = mongoose.model('Subscription', subSchema);
