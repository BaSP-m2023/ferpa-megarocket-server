const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClassSchema = new Schema({
  day: {
    type: String,
    enum: ['Monday', 'Wednesday', 'Friday'],
    required: true,
  },
  hour: {
    type: Number,
    timestamps: true,
    required: true,
  },
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Trainer',
  },
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Activity',
  },
  slots: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Class', ClassSchema);
