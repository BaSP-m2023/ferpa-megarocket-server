const SuperAdmin = require('../models/SuperAdmin');

const getAllsuperAdmins = (req, res) => {
  SuperAdmin.find()
    .then((superAdmins) => res.status(200).json({
      message: 'Super Admins list',
      data: superAdmins,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'An error was found',
      error,
    }));
};
const getsuperAdminById = (req, res) => {
  const { id } = req.params;
  if (id.length !== 24) {
    return res.status(400).json({
      message: 'Invalid id, try again',
      data: undefined,
      error: true,
    });
  }
  SuperAdmin.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Super admin with id: ${id} was not found`,
          error: true,
          data: undefined,
        });
      }
      return res.status(200).json({
        message: `Super admin with id: ${id} was found`,
        data: result,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({
      message: 'An error was found',
      error,
    }));
  return false;
};

const createSuperAdmin = (req, res) => {
  const { id, email, password } = req.body;

  SuperAdmin.create({
    id,
    email,
    password,
  })
    .then((result) => res.status(201).json({
      message: 'Super admin has been created succesfully',
      data: result,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'An error was detected',
      error,
    }));
};

const updateSuperAdmin = (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;
  if (id.length !== 24) {
    return res.status(400).json({
      message: 'Invalid id, try again',
      data: undefined,
      error: true,
    });
  }
  SuperAdmin.findByIdAndUpdate(
    id,
    {
      email,
      password,
    },
    { new: true },
  )
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Super admin with id: ${id} was not found`,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Super admin has been succesfully updated',
        data: result,
        error: false,
      });
    })
    .catch((error) => res.status(500).json(error));
  return false;
};

const deleteSuperAdmin = (req, res) => {
  const { id } = req.params;
  if (id.length !== 24) {
    return res.status(400).json({
      message: 'Invalid id, try again',
      data: undefined,
      error: true,
    });
  }
  SuperAdmin.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Super admin with id: ${id} was not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Super admin has been succesfully deleted',
      });
    })
    .catch((error) => res.status(500).json({
      message: 'An error ocurred!',
      error,
    }));
  return false;
};

module.exports = {
  getAllsuperAdmins,
  getsuperAdminById,
  createSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin,
};
