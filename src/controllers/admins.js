const Admin = require('../models/Admin');

const regexObjectId = /^[0-9a-fA-F]{24}$/;

const createAdmin = (req, res) => {
  const {
    firstName, lastName, dni, phone, email, city, password,
  } = req.body;

  Admin.create({
    firstName,
    lastName,
    dni,
    phone,
    email,
    city,
    password,
  })
    .then((admin) => {
      res.status(201).json({
        message: 'Admin created.',
        data: admin,
        error: false,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error',
        error,
      });
    });
};

const deleteAdmin = (req, res) => {
  const { id } = req.params;
  if (!id.match(regexObjectId)) {
    res.status(400).json({
      message: 'Please put a valid ID',
      data: undefined,
      error: true,
    });
  }
  Admin.findByIdAndDelete(id)
    .then((admin) => {
      if (!admin) {
        res.status(404).json({
          message: `Admin with id: ${id} was not found.`,
          data: undefined,
          error: true,
        });
      }
      res.status(200).json({
        message: `Admin with id: ${id} was removed.`,
        data: admin,
        error: false,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'An error ocurred',
        data: undefined,
        error,
      });
    });
};

module.exports = {
  createAdmin,
  deleteAdmin,
};
