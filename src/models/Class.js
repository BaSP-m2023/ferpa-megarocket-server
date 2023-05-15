const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClassSchema = new Schema({
  id: Number,
  day: {
    types: [String],
  },
  hour: Number,
  trainer: {
    type: String,
  },
  activity: {
    type: String,
  },
  slots: Number,

});

module.exports = mongoose.model('Class', ClassSchema);

const ClassSchemanew = new Schema(
  {
    id: {
      type: Number,
      require: true,
    },
    day: {
      types: String,
      require: true,
      enum: ['Monday', 'Wednesday', 'Friday'],
    },
    hour: {
      type: Number,
      require: true,
    },
    trainer: {
      type: String,
      require: true,
    },
    activity: {
      type: String,
      require: true,
    },
    slots: {
      Type: Number,
      require: true,
    },
  },
);
