const mongoose = require('mongoose');

const { Schema } = mongoose;
const adminSchema = new Schema({
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
  password: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('Admin', adminSchema);
