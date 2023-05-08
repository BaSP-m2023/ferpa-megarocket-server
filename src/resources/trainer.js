const express = require('express');
const fs = require('fs');

const trainers = require('../data/trainer.json');

const router = express.Router();

router.put('/put/:id', (req, res) => {
  const trainerId = req.params.id;
  const updateTrainer = req.body;
  const foundTrainer = trainers.find((trainer) => trainer.id.toString() === trainerId);
  if (foundTrainer) {
    trainers.forEach((trainer) => {
      if (trainer.id.toString() === trainerId) {
        const aux = trainer;
        aux.firstName = updateTrainer.firstName ? updateTrainer.firstName : aux.firstName;
        aux.lastName = updateTrainer.lastName ? updateTrainer.lastName : aux.lastName;
        aux.phone = updateTrainer.phone ? updateTrainer.phone : aux.phone;
        aux.activityId = updateTrainer.activityId ? updateTrainer.activityId : aux.activityId;
        aux.salary = updateTrainer.salary ? updateTrainer.salary : aux.salary;
        aux.status = updateTrainer.status ? updateTrainer.status : aux.status;

        fs.writeFile('src/data/trainer.json', JSON.stringify(trainers, null, 2), (err) => {
          if (err) {
            res.status(400).json({ msg: 'Error! Trainer can not be update' });
          } else {
            res.status(200).json({ msg: 'Trainer updated!' });
          }
        });
      }
    });
  } else {
    res.status(400).json({ msg: `No trainer with the id of ${req.params.id}` });
  }
});

router.delete('/delete/:id', (req, res) => {
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
