const express = require('express');

const fs = require('fs');

const classes = require('../data/class.json');

const router = express.Router();

router.put('/:id', (req, res) => {
  const classId = req.params.id;
  const foundClass = classes.find((_class) => _class.id.toString() === classId);
  const editClass = req.body;

  if (foundClass) {
    foundClass.activityId = editClass.activityId ? editClass.activityId : foundClass.activityId;
    foundClass.trainerId = editClass.trainerId ? editClass.trainerId : foundClass.trainerId;
    foundClass.day = editClass.day ? editClass.day : foundClass.day;
    foundClass.time = editClass.time ? editClass.time : foundClass.time;
    foundClass.enrollments = editClass.enrollments ? editClass.enrollments : foundClass.enrollments;

    const theClass = classes.filter((_class) => _class.id.toString() !== classId);
    theClass.push(foundClass);

    fs.writeFile('src/data/class.json', JSON.stringify(classes, null, 2), (err) => {
      if (err) {
        res.status(400).json({ msg: `ERROR updating class ${classId}` });
      } else {
        res.status(200).json({ msg: `Class ${classId} updated succesfully`, data: foundClass });
      }
    });
  } else {
    res.status(400).json({ msg: `ERROR updating a class ${classId}` });
  }
});

router.delete('/:id', (req, res) => {
  const classId = req.params.id;
  const filteredClass = classes.filter((_class) => _class.id.toString() !== classId);
  if (classes.length === filteredClass.length) {
    res.status(400).json({ msg: `ERROR class with the id ${classId} not exist` });
  } else {
    fs.writeFile('src/data/class.json', JSON.stringify(filteredClass, null, 2), (err) => {
      if (err) {
        res.status(400).json({ msg: `ERROR deleting class ${classId}` });
      } else {
        res.status(200).json({ msg: `Class ${classId} deleted succesfully` });
      }
    });
  }
});

module.exports = router;
