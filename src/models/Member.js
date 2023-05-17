const mongoose = require('mongoose');

const { Schema } = mongoose;

const memberSchema = new Schema({
  id: {
    type: Number,
    require: true,
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
  birthDay: {
    type: Date,
    require: true,
  },
  postalCode: {
    type: Number,
    require: true,
  },
  isActive: {
    type: Boolean,
    require: true,
  },
  membership: {
    type: String,
    require: true,
    enum: ['Classic', 'Only Classes', 'Black'],
  },
});

module.exports = mongoose.model('Member', memberSchema);
