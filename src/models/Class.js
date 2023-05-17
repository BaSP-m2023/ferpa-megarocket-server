const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClassSchema = new Schema({
  day: {
    type: String,
    enum: ['Monday', 'Wednesday', 'Friday'],
    require: true,
  },
  hour: {
    type: Number,
    timestamps: true,
    require: true,

  },
  trainerId: {
    type: String,
    require: true,
  },
  activityId: {
    type: String,
    require: true,
  },
  slots: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model('Class', ClassSchema);
