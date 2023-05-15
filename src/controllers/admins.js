const Admin = require('../models/Admin');

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
    .then((result) => {
      res.status(201).json({
        data: result,
        error: false,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: 'Error',
        error,
      });
    });
};

const deleteAdmin = (req, res) => {
  const { id } = req.params;

  Admin.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: `Admin with id: ${id} was not found.`,
          error: true,
        });
      }
      res.status(200).json({
        message: `Admin with id: ${id} was removed.`,
        data: result,
        error: false,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: 'An error ocurred',
        error,
      });
    });
};

module.exports = {
  createAdmin,
  deleteAdmin,
};
