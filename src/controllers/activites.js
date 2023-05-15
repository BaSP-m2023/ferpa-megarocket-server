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

  Activity.findById(id)
    .then((act) => {
      if (act) {
        res.status(200).json({
          message: 'The activity was found.',
          data: act,
          error: false,
        });
      } else {
        res.status(200).json({
          message: 'The activity was not found',
          error: false,
        });
      }
    })
    .catch((error) => res.json({
      message: 'There is something wrong.',
      error,
    }));
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
  const { nameActivity, descriptionActivity, isActiveActivity } = req.body;

  Activity.findByIdAndUpdate(
    id,
    {
      nameActivity,
      descriptionActivity,
      isActiveActivity,
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
};
const deleteActivity = (req, res) => {
  const { id } = req.params;

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
};

module.exports = {
  getActivities,
  getActivitiesById,
  createActivity,
  updateActivity,
  deleteActivity,
};
