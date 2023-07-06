import mongoose from 'mongoose';

const { Schema } = mongoose;

const trainerSchema = new Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  dni: {
    type: Number,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  salary: {
    type: Number,
    require: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  activities: [
    {
      activityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Activity',
      },
    },
  ],
});

export default mongoose.model('Trainer', trainerSchema);
