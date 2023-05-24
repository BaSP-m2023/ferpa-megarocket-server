const Activity = require('../models/Activity');

const getActivities = (req, res) => {
  Activity.find()
    .then((activities) => res.status(200).json({
      message: 'Complete list of activities',
      data: activities,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'There is some mistake',
      error,
    }));
};

const getActivitiesById = (req, res) => {
  const { id } = req.params;

  if (id.length === 24) {
    Activity.findById(id)
      .then((act) => {
        if (act) {
          res.status(200).json({
            message: 'The activity was found.',
            data: act,
            error: false,
          });
        } else {
          res.status(400).json({
            message: 'The activity was not found',
            error: true,
          });
        }
      })
      .catch((error) => res.json({
        message: 'There is something wrong.',
        error,
      }));
  } else {
    res.status(400).json({
      message: 'Incorrect ID format',
      data: undefined,
      error: true,
    });
  }
};

const createActivity = (req, res) => {
  const { name, description, isActive } = req.body;

  Activity.create({
    name,
    description,
    isActive,
  })
    .then((response) => res.status(201).json({
      message: 'Activity created succesfully.',
      data: response,
      error: false,
    }))
    .catch((error) => res.status(400).json({
      message: 'There is something wrong',
      error,
    }));
};
const updateActivity = (req, res) => {
  const { id } = req.params;
  const { name, description, isActive } = req.body;

  if (id.length === 24) {
    Activity.findByIdAndUpdate(
      id,
      {
        name,
        description,
        isActive,
      },
      { new: true },
    )
      .then((response) => {
        if (!response) {
          return res.status(404).json({
            message: 'The activity was not found',
            error: true,
          });
        }
        return res.status(200).json({
          message: 'The activity was succesfully updated',
          data: response,
          error: false,
        });
      })
      .catch((error) => res.status(400).json(error));
  } else {
    res.status(400).json({
      message: 'Incorrect ID format',
      data: undefined,
      error: true,
    });
  }
};
const deleteActivity = (req, res) => {
  const { id } = req.params;

  if (id.length === 24) {
    Activity.findByIdAndDelete(id)
      .then((response) => {
        if (!response) {
          return res.status(404).json({
            message: 'The activity was not found',
          });
        }
        return res.status(200).json({
          message: 'The activity was succesfully deleted',
        });
      })
      .catch((error) => res.status(400).json({
        message: 'There is something wrong.',
        error,
      }));
  } else {
    res.status(400).json({
      message: 'Incorrect ID format',
      data: undefined,
      error: true,
    });
  }
};

module.exports = {
  getActivities,
  getActivitiesById,
  createActivity,
  updateActivity,
  deleteActivity,
};
