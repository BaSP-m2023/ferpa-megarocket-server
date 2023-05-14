const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClassSchema = new Schema({
  id: Number,
  day: {
    type: String,
    enum: ['Monday', 'Wednesday', 'Friday'],
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
