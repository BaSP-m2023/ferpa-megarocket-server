const express = require('express');
const fs = require('fs');

const activities = require('../data/activity.json');

const router = express.Router();

router.delete('/:id', (req, res) => {
  const activityId = req.params.id;
  const filteredActivity = activities.filter((activity) => activity.id.toString()
  === activityId);
  if (filteredActivity) {
    fs.writeFile('src/data/activity.json', JSON.stringify(filteredActivity, null, 2), (err) => {
      if (err) {
        res.send('Error!');
      } else {
        res.send('Activity deleted.');
      }
    });
  } else {
    res.status(400).json({ msg: `Member with id: ${activityId} was not found` });
  }
});

router.put('/:id', (req, res) => {
  const activityId = parseInt(req.params.id, 10);
  const found = activities.find((activity) => activity.id === activityId);

  if (found) {
    const updActivity = req.body;
    activities.forEach((activity) => {
      if (activity.id === activityId) {
        const oldActivity = activity;
        oldActivity.activityName = updActivity.activityName || oldActivity.activityName;
        oldActivity.activityType = updActivity.activityType || oldActivity.activityType;
        oldActivity.durationMinutes = updActivity.durationMinutes || oldActivity.durationMinutes;
        oldActivity.startTime = updActivity.startTime || oldActivity.startTime;
        oldActivity.endTime = updActivity.endTime || oldActivity.endTime;
        oldActivity.instructorName = updActivity.instructorName || oldActivity.instructorName;
        oldActivity.instructorGender = updActivity.instructorGender || oldActivity.instructorGender;
        oldActivity.equipmentUsed = updActivity.equipmentUsed || oldActivity.equipmentUsed;
        fs.writeFile('src/data/activity.json', JSON.stringify(activities, null, 2), (err) => {
          if (err) {
            res.send('Error!');
          } else {
            res.send('Activity deleted.');
          }
        });
        res.json({ msg: 'Activity Updated', activity });
      }
    });
  } else {
    res.status(400).json({ msg: `Activity with id: ${activityId} was not found` });
  }
});

module.exports = router;
