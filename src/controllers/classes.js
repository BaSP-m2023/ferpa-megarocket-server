const Class = require('../models/Class');

const getAllClasses = (req, res) => {
  Class.find()
    .then((classes) => res.status(200).json({
      messege: 'Complete the class list',
      data: classes,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      messege: 'Error',
      error,
    }));
};

module.exports = {
  getAllClasses,
};
