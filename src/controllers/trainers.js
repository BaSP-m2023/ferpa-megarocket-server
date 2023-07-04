import Trainer from '../models/Trainer';
import firebaseApp from '../helper/firebase';

const regexObjectId = /^[0-9a-fA-F]{24}$/;

const getAllTrainers = (req, res) => {
  Trainer.find().populate('activityId')
    .then((trainers) => res.status(200).json({
      message: 'Trainers list.',
      data: trainers,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'An error ocurred.',
      error,
    }));
};

const getTrainerById = (req, res) => {
  const { id } = req.params;

  if (id.length !== 24) {
    return res.status(400).json({
      message: 'Invalid id, try again',
      data: undefined,
      error: true,
    });
  }
  Trainer.findById(id).populate('activityId')
    .then((trainer) => {
      if (!trainer) {
        return res.status(404).json({
          message: `Trainers with the id ${id} was not found.`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Trainers with the id ${id} was succesfully found.`,
        data: trainer,
        error: false,
      });
    })
    .catch((error) => {
      res.json({
        message: 'An error ocurred.',
        data: undefined,
        error,
      });
    });
  return false;
};

const createTrainer = async (req, res) => {
  const {
    firstName, lastName, dni, phone, email, city, password, salary, activityId,
  } = req.body;
  try {
    const existingTrainer = await Trainer.findOne({ $or: [{ dni }, { email }] });
    if (existingTrainer) {
      return res.status(400).json({
        message: 'Trainer already exists',
        data: undefined,
        error: true,
      });
    }
    const newFirebaseTrainer = await firebaseApp.auth().createUser({
      email, password,
    });
    const firebaseUid = newFirebaseTrainer.uid;
    await firebaseApp.auth().setCustomUserClaims(newFirebaseTrainer.uid, { role: 'TRAINER' });
    const trainer = await Trainer.create({
      firebaseUid,
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      password,
      salary,
      activityId,
    });
    return res.status(201).json({
      message: 'Trainer has been succesfully created.',
      data: trainer,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error ocurred.',
      error,
    });
  }
};

const deleteTrainer = async (req, res) => {
  const { id } = req.params;
  if (!id.match(regexObjectId)) {
    return res.status(400).json({
      message: 'Id invalid, try again!',
      data: undefined,
      error: true,
    });
  }
  try {
    const { firebaseUid } = await Trainer.findById(id);
    await firebaseApp.auth().deleteUser(firebaseUid);
    const result = await Trainer.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        message: `Trainer with id ${id} was not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Trainer has been succesfully deleted.',
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error ocurred!',
      error,
    });
  }
};

const updateTrainer = async (req, res) => {
  const { id } = req.params;
  if (!id.match(regexObjectId)) {
    res.status(400).json({
      message: 'Id invalid, try again!',
      data: undefined,
      error: true,
    });
  }
  const {
    firstName, lastName, dni, phone, email, city, password, salary, isActive, activityId,
  } = req.body;
  try {
    const { firebaseUid } = await Trainer.findById(id);
    await firebaseApp.auth().updateUser(firebaseUid, { email, password });
    const result = await Trainer.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        dni,
        phone,
        email,
        city,
        password,
        salary,
        isActive,
        activityId,
      },
      { new: true },
    );

    if (!result) {
      return res.status(404).json({
        message: `Trainer with id ${id} was not found`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Trainer has been succesfully updated',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error ocurred!',
      error,
    });
  }
};
export default {
  getAllTrainers,
  createTrainer,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
};
