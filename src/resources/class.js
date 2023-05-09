const express = require('express');

const fs = require('fs');

const classes = require('../data/class.json');

const router = express.Router();

router.put('/:id', (req, res) => {
  const classId = req.params.id;
  const foundClass = classes.some((_class) => _class.id.toString() === classId);
  const editClass = req.body;

  if (foundClass) {
    classes.forEach((_class) => {
      if (_class.id.toString() === classId) {
        const theClass = _class;
        theClass.activityId = editClass.activityId ? editClass.activityId : theClass.activityId;
        theClass.trainerId = editClass.trainerId ? editClass.trainerId : theClass.trainerId;
        theClass.day = editClass.day ? editClass.day : theClass.day;
        theClass.time = editClass.time ? editClass.time : theClass.time;
        theClass.enrollments = editClass.enrollments ? editClass.enrollments : theClass.enrollments;

        fs.writeFile('src/data/class.json', JSON.stringify(classes, null, 2), (err) => {
          if (err) {
            res.status(400).json({ msg: `ERROR updating class ${classId}` });
          } else {
            res.status(200).json({ msg: `Class ${classId} updated succesfully` });
          }
        });
        res.status(200).json({ msg: `Class ${classId} updated succesfully`, data: theClass });
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
