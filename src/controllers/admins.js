const Admin = require('../models/Admin');

const getAllAdmin = (req, res) => {
  Admin.find()
    .then((admins) => {
      res.status(200).json({
        message: 'Complete admins list',
        data: admins,
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

const getAdminById = (req, res) => {
  const { id } = req.params;
  Admin.findById(id, 'firstName')
    .then((admins) => {
      if (!admins) {
        res.status(404).json({
          message: `Admin with id: ${id} was not found`,
          error: true,
        });
      } else {
        res.status(200).json({
          message: `Admin found. Is ${admins.firstName}`,
          data: admins,
          error: false,
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        message: 'An error ocurred',
        error,
      });
    });
};

const updateAdmin = (req, res) => {
  const { id } = req.params;
  const {
    firstName, lastName, dni, phone, email, city, password,
  } = req.body;
  Admin.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      password,
    },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Admin with id: ${id} was not found`,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Admin with id: ${id} was updated.`,
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
  getAllAdmin,
  getAdminById,
  updateAdmin,
};
