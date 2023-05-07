const express = require('express');

const activity = require('../data/activity.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(activity);
});

router.get('/:id', (req, res) => {
  const activityId = req.params.id;
  const foundActivity = activity.find((activities) => activities.id.toString() === activityId);
  if (foundActivity) {
    res.send(foundActivity);
  } else {
    res.send('Activity not found');
  }
});

module.exports = router;
