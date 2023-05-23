const Member = require('../models/Member');

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

const createMember = (req, res) => {
  const {
    firstName, lastName, dni, phone, email, city, birthDay, postalCode, isActive, membership,
  } = req.body;

  Member.create({
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
  })
    .then((result) => res.status(201).json({
      message: 'Member was succesfully created.',
      data: result,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: 'An error ocurred!',
      error,
    }));
};

const updateMember = (req, res) => {
  const { id } = req.params;
  if (!id.match(regexObjectId)) {
    return res.status(400).json({
      message: 'Id invalid, try again!',
      data: undefined,
      error: true,
    });
  } {
    const {
      firstName, lastName, dni, phone, email, city, birthDay, postalCode, isActive, membership,
    } = req.body;

    Member.findByIdAndUpdate(
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
      },
      { new: true },
    )
      .then((result) => {
        if (!result) {
          return res.status(404).json({
            message: `Member with id: ${id} was not found`,
            data: undefined,
            error: true,
          });
        }
        return res.status(200).json({
          message: `Member with id: ${id} was succesfully updated`,
          data: result,
          error: false,
        });
      })
      .catch((error) => res.status(500).json({
        message: 'An error ocurred!',
        data: undefined,
        error,
      }));
  }
  return false;
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

const deleteMember = (req, res) => {
  const { id } = req.params;
  if (!id.match(regexObjectId)) {
    return res.status(400).json({
      message: `Id:${id} is invalid`,
      data: undefined,
      error: true,
    });
  }
  Member.findByIdAndDelete(id)
    .then((member) => {
      if (!member) {
        return res.status(404).json({
          message: `Member with id: ${id} was not found.`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Member with id: ${id} was removed.`,
        data: member,
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

module.exports = {
  getAllMembers,
  createMember,
  updateMember,
  getMemberById,
  deleteMember,
};
