const express = require('express');
const fs = require('fs');
const classes = require('../data/class.json');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    data: classes,
  });
});

router.get('/:id', (req, res) => {
  const classId = parseInt(req.params.id, 10);
  const foundClass = classes.find((_class) => _class.id === classId);
  if (foundClass) {
    res.status(200).json({
      msg: 'Class founded!',
      data: foundClass,
    });
  } else {
    res.status(400).json({ msg: `No class with id ${classId} was found.` });
  }
});

router.post('/', (req, res) => {
  const paramClass = req.body;
  if (!paramClass.trainerId || !paramClass.activityId || !paramClass.day) {
    res.status(400).json({ msg: 'Please provide trainer_id, activity_id and day to create a new class.' });
  } else {
    const valueId = classes[classes.length - 1].id + 1;
    const newClass = {
      id: valueId,
      activityId: paramClass.activityId,
      trainerId: paramClass.trainerId,
      day: paramClass.day,
      time: paramClass.time,
      enrollments: paramClass.enrollments,
    };
    classes.push(newClass);
    fs.writeFile('src/data/class.json', JSON.stringify(classes, null, 2), (err) => {
      if (err) {
        res.status(500).json({ msg: 'Error creating the class.' });
      } else {
        res.status(200).json({ msg: 'Class successfully created.' });
      }
    });
  }
});

module.exports = router;
