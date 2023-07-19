import mongoose from 'mongoose';

const { Schema } = mongoose;

const trainerSchema = new Schema({
  firebaseUid: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  dni: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
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
  salary: {
    type: Number,
    require: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  activities: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: 'Activity',
  },
});

export default mongoose.model('Trainer', trainerSchema);
