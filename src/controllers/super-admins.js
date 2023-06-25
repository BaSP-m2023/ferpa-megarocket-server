import firebaseApp from '../helper/firebase';

import SuperAdmin from '../models/SuperAdmin';

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

const createSuperAdmin = async (req, res) => {
  const { email } = req.body;

  const existingSuperAdmin = await SuperAdmin.findOne({ email });
  if (existingSuperAdmin) {
    return res.status(400).json({
      message: 'Super Admin already exists',
      data: req.body,
      error: true,
    });
  }
  const newFirebaseSuperAdmin = await firebaseApp.auth().createSuperAdmin({
    email: req.body.email,
    password: req.body.password,
  });
  const firebaseUid = newFirebaseSuperAdmin.uid;
  await firebaseApp.auth().setCustomUserClaims(newFirebaseSuperAdmin.uid, { role: 'SUPER-ADMIN' });
  return SuperAdmin.create({
    firebaseUid,
    email,
  })
    .then((postSuperAdmin) => res.status(201).json({
      message: 'Super admin has been created succesfully',
      data: postSuperAdmin,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'Server responded with an error',
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

export default {
  getAllsuperAdmins,
  getsuperAdminById,
  createSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin,
};
