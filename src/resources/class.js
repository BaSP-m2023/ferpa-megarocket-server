const express = require('express');
const fs = require('fs');
const classes = require('../data/class.json');

const router = express.Router();

router.get('/get', (req, res) => {
  res.status(200).json({
    data: classes,
  });
});

router.get('/getById/:id', (req, res) => {
  const classId = parseInt(req.params.id, 10);
  const foundClass = classes.find((_class) => _class.id === classId);
  if (foundClass) {
    res.send(foundClass);
  } else {
    res.status(400).json({ msg: `No class with id ${classId} was found.` });
  }
});

router.post('/post', (req, res) => {
  const newClass = req.body;
  const newClassId = parseInt(req.body.id, 10);
  const foundClass = classes.find((_class) => _class.id === newClassId);
  if (!newClass.id || !newClass.trainerId || !newClass.activityId || !newClass.day) {
    res.status(400).json({ msg: 'We need an id, trainer id, acivity id and day to create a new class.' });
  } else if (foundClass) {
    res.status(400).json({ msg: 'Class already exists!' });
  } else {
    classes.push(newClass);
    fs.writeFile('src/data/class.json', JSON.stringify(classes, null, 2), (err) => {
      if (err) {
        res.status(400).json({ msg: 'Error! Class cant be created' });
      } else {
        res.status(200).json({ msg: 'Class created!' });
      }
    });
  }
});

module.exports = router;
