const express = require('express');
const fs = require('fs');
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

router.post('/', (req, res) => {
  const newActivity = req.body;
  activity.push(newActivity);
  fs.writeFile('src/data/activity.json', JSON.stringify(activity, null, 2), (err) => {
    if (err) {
      res.send('Error!');
    } else {
      res.send('Activity created!');
    }
  });
  res.send(activity);
});

module.exports = router;
