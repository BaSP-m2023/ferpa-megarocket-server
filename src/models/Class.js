import mongoose from 'mongoose';

const { Schema } = mongoose;

const ClassSchema = new Schema({
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true,
  },
  hour: {
    type: String,
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
  subscribers: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: 'Member',
  },
});

export default mongoose.model('Class', ClassSchema);
