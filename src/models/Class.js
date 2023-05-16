const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClassSchema = new Schema({
  day: {
    type: String,
    enum: ['Monday', 'Wednesday', 'Friday'],
  },
  hour: {
    type: Number,
    timestamps: true,
  },
  trainerId: {
    type: String,
  },
  activityId: {
    type: String,
  },
  slots: {
    type: Number,
  },
});

module.exports = mongoose.model('Class', ClassSchema);
