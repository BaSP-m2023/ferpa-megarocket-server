const mongoose = require('mongoose');

const { Schema } = mongoose;

const subSchema = new Schema(
  {
    _class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      require: true,
    },
    member: {
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
