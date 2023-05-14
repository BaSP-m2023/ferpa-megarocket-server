const SuperAdmin = require('../models/SuperAdmin');

const getAllsuperAdmins = (req, res) => {
  SuperAdmin.find()
    .then((superAdmins) => res.status(200).json({
      message: 'Super Admins list',
      data: superAdmins,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'append an error',
      error,
    }));
};

module.exports = {
  getAllsuperAdmins,
};
