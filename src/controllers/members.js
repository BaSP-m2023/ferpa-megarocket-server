const Member = require('../models/Member');

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
    id, firstName, lastName, dni, phone, email, city, birthDay, postalCode, isActive, membership,
  } = req.body;

  Member.create({
    id,
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
    .then((result) => res.status(201).json(result))
    .catch((error) => res.status(400).json({
      message: 'An error ocurred!',
      error,
    }));
};

const updateMember = (req, res) => {
  const { id } = req.params;
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
          error: true,
        });
      }
      return res.status(200).json(result);
    })
    .catch((error) => res.status(400).json(error));
};

module.exports = {
  getAllMembers,
  createMember,
  updateMember,
};
