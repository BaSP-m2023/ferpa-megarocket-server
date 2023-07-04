import firebaseApp from '../helper/firebase';
import Member from '../models/Member';

const regexObjectId = /^[0-9a-fA-F]{24}$/;
const getAllMembers = (req, res) => {
  Member.find()
    .then((members) => res.status(200).json({
      message: 'Complete members list',
      data: members,
      error: false,
    }))
    .catch((error) => res.status(404).json({
      message: 'An error ocurred',
      error,
    }));
};

const getMemberById = (req, res) => {
  const { id } = req.params;
  if (!id.match(regexObjectId)) {
    return res.status(400).json({
      message: `Id:${id} is invalid`,
      data: undefined,
      error: true,
    });
  }
  Member.findById(id)
    .then((member) => {
      if (!member) {
        return res.status(404).json({
          message: `Member with id: ${id} was not found.`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Member with id: ${id} was found.`,
        data: member,
        error: false,
      });
    })
    .catch((error) => res.status(500).json({
      message: 'An error ocurred!',
      data: undefined,
      error,
    }));
  return false;
};

const createMember = async (req, res) => {
  const {
    firstName,
    lastName,
    dni,
    phone,
    email,
    city,
    birthDay,
    postalCode,
    isActive,
    membership,
    password,
  } = req.body;
  try {
    const existingMember = await Member.findOne({ $or: [{ dni }, { email }] });
    if (existingMember) {
      return res.status(400).json({
        message: 'Member already exists',
        data: undefined,
        error: true,
      });
    }
    const newFirebaseMember = await firebaseApp.auth().createUser({
      email, password,
    });
    const firebaseUid = newFirebaseMember.uid;
    await firebaseApp.auth().setCustomUserClaims(newFirebaseMember.uid, { role: 'MEMBER' });
    const result = await Member.create({
      firebaseUid,
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      birthDay,
      postalCode,
      isActive,
      membership,
    });
    return res.status(201).json({
      message: 'Member was succesfully created.',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error ocurred!',
      error,
    });
  }
};

const updateMember = async (req, res) => {
  const { id } = req.params;
  if (!id.match(regexObjectId)) {
    return res.status(400).json({
      message: 'Id invalid, try again!',
      data: undefined,
      error: true,
    });
  } {
    const {
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      birthDay,
      postalCode,
      isActive,
      membership,
      password,
    } = req.body;
    try {
      const { firebaseUid } = await Member.findById(id);
      await firebaseApp.auth().updateUser(firebaseUid, { email, password });
      const result = await Member.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          dni,
          phone,
          email,
          city,
          birthDay,
          postalCode,
          isActive,
          membership,
          password,
        },
      );
      if (!result) {
        return res.status(404).json({
          message: `Member with id: ${id} was not found`,
          data: undefined,
          error: true,
        });
      } return res.status(200).json({
        message: 'Member has been succesfully updated',
        data: result,
        error: false,
      });
    } catch (error) {
      res.status(500).json({
        message: 'An error ocurred!',
        data: undefined,
        error,
      });
    }
  }
  return false;
};

const deleteMember = async (req, res) => {
  const { id } = req.params;
  if (!id.match(regexObjectId)) {
    return res.status(400).json({
      message: `Id:${id} is invalid`,
      data: undefined,
      error: true,
    });
  }
  try {
    const { firebaseUid } = await Member.findById(id);
    await firebaseApp.auth().deleteUser(firebaseUid);
    const member = await Member.findByIdAndDelete(id);
    if (!member) {
      return res.status(404).json({
        message: `Member with id: ${id} was not found.`,
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Member has been succesfully removed.',
      data: member,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error ocurred',
      data: undefined,
      error,
    });
  }
};

export default {
  getAllMembers,
  createMember,
  updateMember,
  getMemberById,
  deleteMember,
};
