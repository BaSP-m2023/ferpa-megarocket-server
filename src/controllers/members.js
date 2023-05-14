const Member = require('../models/Member');

const getMemberById = (req, res) => {
  const { id } = req.params;
  Member.findById(id)

    .then((member) => res.status(200).json({
      message: `Member found! It was ${id}`,
      data: member,
      error: false,
    }))
    .catch((error) => res.json({
      message: 'An error ocurred',
      error,
    }));
};

module.exports = {
  getMemberById,
};
