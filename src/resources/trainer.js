const express = require('express');
const fs = require('fs');

const trainers = require('../data/trainer.json');

const router = express.Router();

router.put('/:id', (req, res) => {
  const trainerId = req.params.id;
  const updateTrainer = req.body;
  const foundTrainer = trainers.find((trainer) => trainer.id.toString() === trainerId);
  if (foundTrainer) {
    foundTrainer.firstName = updateTrainer.firstName ? updateTrainer.firstName
      : foundTrainer.firstName;
    foundTrainer.lastName = updateTrainer.lastName ? updateTrainer.lastName : foundTrainer.lastName;
    foundTrainer.phone = updateTrainer.phone ? updateTrainer.phone : foundTrainer.phone;
    foundTrainer.activityId = updateTrainer.activityId ? updateTrainer.activityId
      : foundTrainer.activityId;
    foundTrainer.salary = updateTrainer.salary ? updateTrainer.salary : foundTrainer.salary;
    foundTrainer.status = updateTrainer.status ? updateTrainer.status : foundTrainer.status;
    const trainer = trainers.filter((train) => train.id.toString() !== trainerId);
    trainer.push(foundTrainer);
    fs.writeFile('src/data/trainer.json', JSON.stringify(trainers, null, 2), (err) => {
      if (err) {
        res.status(400).json({ msg: 'Error! Trainer can not be update' });
      } else {
        res.status(200).json({ msg: 'Trainer updated!', data: foundTrainer });
      }
    });
  } else {
    res.status(400).json({ msg: `No trainer with the id of ${req.params.id}` });
  }
});

router.delete('/:id', (req, res) => {
  const trainerId = req.params.id;
  const filterTrainer = trainers.filter((trainer) => trainer.id.toString() !== trainerId);
  if (filterTrainer.length === trainers.length) {
    res.status(400).json({ msg: 'Trainer not found!' });
  } else {
    fs.writeFile('src/data/trainer.json', JSON.stringify(filterTrainer, null, 2), (err) => {
      if (err) {
        res.status(400).json({ msg: 'Error! Trainer can not be deleted' });
      } else {
        res.status(200).json({ msg: 'Trainer deleted!' });
      }
    });
  }
});

module.exports = router;
