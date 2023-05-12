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

router.delete('/:id', (req, res) => {
  const activityId = req.params.id;
  const filteredActivities = activities.filter((activity) => activity.id.toString()
  !== activityId);
  if (activities.find((activity) => activity.id.toString() === activityId)) {
    fs.writeFile('src/data/activity.json', JSON.stringify(filteredActivities, null, 2), (err) => {
      if (err) {
        res.status(400).send('Error!');
      } else {
        res.status(200).send('Activity deleted!');
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
    const oldActivity = found;
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
        res.status(200).json({ msg: 'Activity Updated!', data: found });
      }
    });
  } else {
    res.status(400).json({ msg: `Activity with id: ${activityId} was not found` });
  }
});

module.exports = router;

