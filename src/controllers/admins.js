import firebaseApp from '../helper/firebase';

const Admin = require('../models/Admin');

const regexObjectId = /^[0-9a-fA-F]{24}$/;

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
      res.status(500).json({
        message: 'An error ocurred',
        data: undefined,
        error,
      });
    });
};

const getAdminById = (req, res) => {
  const { id } = req.params;
  if (!id.match(regexObjectId)) {
    return res.status(400).json({
      message: `Id: ${id} invalid, try a valid id`,
      data: undefined,
      error: true,
    });
  } Admin.findById(id, 'firstName lastName dni phone email city password')
    .then((admins) => {
      if (!admins) {
        return res.status(404).json({
          message: `Admin with id: ${id} was not found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Admin found. Is ${admins.firstName}`,
        data: admins,
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
  return false;
};

const updateAdmin = (req, res) => {
  const { id } = req.params;
  if (!id.match(regexObjectId)) {
    return res.status(400).json({
      message: `Id: ${id} invalid, try a valid id`,
      data: undefined,
      error: true,
    });
  }
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
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Admin has been succesfully updated.',
        data: result,
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
  return false;
};

const createAdmin = async (req, res) => {
  const {
    firstName, lastName, dni, phone, email, city, password,
  } = req.body;

  const existingAdmin = await Admin.findOne({ $or: [{ dni }, { email }] });
  if (existingAdmin) {
    return res.status(400).json({
      message: 'Admin already exists',
      data: req.body,
      error: true,
    });
  }
  const newFirebaseAdmin = await firebaseApp.auth().createAdmin({
    email: req.body.email,
    password: req.body.password,
  });
  const firebaseUid = newFirebaseAdmin.uid;
  await firebaseApp.auth().setCustomUserClaims(newFirebaseAdmin.uid, { role: 'ADMIN' });
  return Admin.create({
    firebaseUid,
    firstName,
    lastName,
    dni,
    phone,
    email,
    city,
    password,
  })
    .then((postAdmin) => {
      res.status(201).json({
        message: 'Admin created.',
        data: postAdmin,
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
    return res.status(400).json({
      message: 'Please put a valid ID',
      data: undefined,
      error: true,
    });
  }
  Admin.findByIdAndDelete(id)
    .then((admin) => {
      if (!admin) {
        return res.status(404).json({
          message: `Admin with id: ${id} was not found.`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Admin has been succesfully removed.',
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
  return false;
};

export default {
  getAllAdmin,
  getAdminById,
  updateAdmin,
  createAdmin,
  deleteAdmin,
};
