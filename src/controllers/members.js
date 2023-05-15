const Member = require('../models/Member');

const getMemberById = (req, res) => {
  const { id } = req.params;
  Member.findById(id)
    .then((member) => {
      if (!member) {
        return res.status(404).json({
          message: `Member with id: ${id} was not found`,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Member found! It was ${id}`,
        data: member,
      });
    })
    .catch((error) => res.status(400).json({
      message: 'An error ocurred!',
      error,
    }));
};

const deleteMember = (req, res) => {
  const { id } = req.params;
  Member.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: `Member with id: ${id} was not found`,
          error: true,
        });
      }
      return res.status(200).json({
        message: `Member with id: ${id} was deteled`,
        error: false,
      });
    })
    .catch((error) => res.status(400).json({
      message: 'An error ocurred!',
      error,
    }));
};

module.exports = {
  getMemberById,
  deleteMember,
};
