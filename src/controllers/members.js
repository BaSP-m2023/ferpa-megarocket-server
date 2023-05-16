const Member = require('../models/Member');

const regexObjectId = /^[0-9a-fA-F]{24}$/;

const getMemberById = (req, res) => {
  const { id } = req.params;
  if (!id.match(regexObjectId)) {
    res.status(400).json({
      message: `Id:${id} is invalid`,
      data: undefined,
      error: true,
    });
  }
  Member.findById(id)
    .then((member) => {
      if (!member) {
        res.status(404).json({
          message: `Member with id: ${id} was not found.`,
          data: undefined,
          error: true,
        });
      }
      res.status(200).json({
        message: `Member with id: ${id} was found.`,
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
};

const deleteMember = (req, res) => {
  const { id } = req.params;
  if (!id.match(regexObjectId)) {
    res.status(400).json({
      message: `Id:${id} is invalid`,
      data: undefined,
      error: true,
    });
  }
  Member.findByIdAndDelete(id)
    .then((member) => {
      if (!member) {
        res.status(404).json({
          message: `Member with id: ${id} was not found.`,
          data: undefined,
          error: true,
        });
      }
      res.status(200).json({
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
};

module.exports = {
  getMemberById,
  deleteMember,
};
