const express = require('express');
const fs = require('fs');

const activity = require('../data/activity.json');

const router = express.Router();

router.delete('/:id', (req, res) => {
  const activityId = req.params.id;
  const filteredActivities = activity.filter((activities) => activities.id.toString()
  !== activityId);
  if (filteredActivities) {
    fs.writeFile('src/data/activity.json', JSON.stringify(filteredActivities, null, 2), (err) => {
      if (err) {
        res.send('Error!');
      } else {
        res.send('Activity deleted.');
      }
    });
  } else {
    res.status(400).json({ msg: 'error' });
  }
});

module.exports = router;
