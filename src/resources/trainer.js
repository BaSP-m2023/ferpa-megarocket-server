const express = require('express');
const fs = require('fs');
const trainers = require('../data/trainer.json');

const router = express.Router();

router.get('/get', (req, res) => {
  res.status(200).json({
    data: trainers,
  });
});

router.get('/getById/:id', (req, res) => {
  const trainerId = req.params.id;
  const foundTrainer = trainers.find((trainer) => trainer.id.toString() === trainerId);
  if (foundTrainer) {
    res.status(200).json({
      msg: 'Trainer founded!',
      data: foundTrainer,
    });
  } else {
    res.status(400).json({ msg: `No trainer with id ${trainerId} was found.` });
  }
});

router.post('/post', (req, res) => {
  const newTrainer = req.body;
  const newTrainerId = parseInt(req.body.id, 10);
  const foundTrainer = trainers.find((trainer) => trainer.id === newTrainerId);
  if (!newTrainer.id || !newTrainer.firstName || !newTrainer.lastName
     || !newTrainer.phone || !newTrainer.activityId || !newTrainer.salary
     || !newTrainer.status) {
    res.status(400).json({ msg: 'We need an id, trainer name, trainer surname, phone, activityId, salary and status' });
  } else if (foundTrainer) {
    res.status(400).json({ msg: 'Trainer already exists!' });
  } else {
    trainers.push(newTrainer);
    fs.writeFile('src/data/trainer.json', JSON.stringify(trainers, null, 2), (err) => {
      if (err) {
        res.status(400).json({ msg: 'Error! Trainer cant be created' });
      } else {
        res.status(200).json({ msg: 'Trainer created!' });
      }
    });
  }
});

module.exports = router;
