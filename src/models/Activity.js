import mongoose from 'mongoose';

const { Schema } = mongoose;

const activitySchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  isActive: {
    type: Boolean,
    require: true,
  },
});

export default mongoose.model('Activity', activitySchema);
