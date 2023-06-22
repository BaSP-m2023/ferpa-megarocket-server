const mongoose = require('mongoose');

const { Schema } = mongoose;

const memberSchema = new Schema({
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
  birthDay: {
    type: Date,
    require: true,
  },
  postalCode: {
    type: String,
    require: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  membership: {
    type: String,
    require: true,
    enum: ['Classic', 'Only Classes', 'Black'],
  },
});

module.exports = mongoose.model('Member', memberSchema);
