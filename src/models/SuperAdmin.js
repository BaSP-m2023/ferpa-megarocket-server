import mongoose from 'mongoose';

const { Schema } = mongoose;

const superAdminSchema = new Schema({
  firebaseUid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
});

export default mongoose.model('SuperAdmin', superAdminSchema);
