const express = require('express');
const fs = require('fs');

const activities = require('../data/activity.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ data: activities });
});

router.get('/:id', (req, res) => {
  const activityId = req.params.id;
  const foundActivity = activities.find((activity) => activity.id.toString() === activityId);
  if (foundActivity) {
    res.status(200).json({ data: foundActivity });
  } else {
    res.status(400).json({ msg: 'Error, activity not found' });
  }
});

router.get('/types/:activityType', (req, res) => {
  const activitiesType = req.params.activityType;
  const filteredActivities = activities.filter((activity) => activity.activityType.toString()
  === activitiesType);
  if (filteredActivities) {
    res.status(200).json({ data: filteredActivities });
  } else {
    res.status(400).json({ msg: 'Error, activities not found' });
  }
});

router.post('/', (req, res) => {
  if (
    req.body) {
    activities.push(req.body);
    fs.writeFile('src/data/activity.json', JSON.stringify(activities, null, 2), (err) => {
      if (err) {
        res.status(400).json({ msg: 'Error!' });
      } else {
        res.status(200).json({ msg: 'Activity Created!', newActivity: req.body });
      }
    });
  } else {
    res.status(400).json({ msg: 'Error, The activity must have: id, activityName, activityType, durationMinutes, startTime, endTime, instructorName, instructorGender and equipmentUsed' });
  }
});

module.exports = router;
