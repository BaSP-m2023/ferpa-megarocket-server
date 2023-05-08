const express = require('express');
const fs = require('fs');

const trainers = require('../data/trainer.json');

const router = express.Router();

router.put('/put/:id', (req, res) => {
  const trainerId = req.params.id;
  const foundTrainer = trainers.find((trainer) => trainer.id.toString() === trainerId);
  if (foundTrainer) {
    const updTrainer = req.body;
    trainers.forEach((trainer) => {
      if (trainer.id.toString() === trainerId) {
        const aux = trainer;
        aux.firstName = updTrainer.firstName ? updTrainer.firstName : aux.firstName;
        aux.lastName = updTrainer.lastName ? updTrainer.lastName : aux.lastName;
        aux.phone = updTrainer.phone ? updTrainer.phone : aux.phone;
        aux.activityId = updTrainer.activityId ? updTrainer.activityId : aux.activityId;
        aux.salary = updTrainer.salary ? updTrainer.salary : aux.salary;
        aux.status = updTrainer.status ? updTrainer.status : aux.status;

        fs.writeFile('src/data/trainer.json', JSON.stringify(trainers, null, 2), (err) => {
          if (err) {
            res.send('Trainer can not be edited!');
          } else {
            res.send('Trainer edited succesfully!');
          }
        });
      }
    });
  } else {
    res.send('Trainer not found.');
  }
});

router.delete('/delete/:id', (req, res) => {
  const trainerId = req.params.id;
  const filterTrainer = trainers.filter((trainer) => trainer.id.toString() !== trainerId);
  fs.writeFile('src/data/trainer.json', JSON.stringify(filterTrainer, null, 2), (err) => {
    if (err) {
      res.send('Trainer can not be deleted!');
    } else {
      res.send('Trainer deleted succesfully!');
    }
  });
});

module.exports = router;
