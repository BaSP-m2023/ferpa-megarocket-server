import mongoose from 'mongoose';

const { Schema } = mongoose;
const adminSchema = new Schema({
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
    lowercase: true,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
});

export default mongoose.model('Admin', adminSchema);
