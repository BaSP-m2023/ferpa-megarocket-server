const mongoose = require('mongoose');

const { Schema } = mongoose;

const superAdminSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('SuperAdmin', superAdminSchema);
