const moongose = require('mongoose');

const { Schema } = moongose;

const activitySchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: false,
  },
  isActive: {
    type: Boolean,
    require: true,
  },
});

module.exports = moongose.model('Activity', activitySchema);
