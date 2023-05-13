const Trainer = require('../models/Trainer');

const getAllTrainers = (req, res) => {
  Trainer.find()
    .then((trainers) => res.status(200).json({
      message: 'Trainers list',
      data: trainers,
      error: false,
    }))
    .catch((error) => res.status(500).json({
      message: 'An ERROR ocurred',
      error,
    }));
};

/* router.get('/:id', (req, res) => {
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
}); */

/* router.post('/', (req, res) => {
  const oldTrainer = req.body;
  if (!oldTrainer.firstName || !oldTrainer.lastName
     || !oldTrainer.phone || !oldTrainer.activityId || !oldTrainer.salary
     || !oldTrainer.status) {
    res.status(400).json({ msg: 'We need trainer name, trainer surname,
     phone, activityId, salary and status' });
  } else {
    const trainerIdentification = trainers[trainers.length - 1].id + 1;
    const newTrainer = {
      id: trainerIdentification,
      firstName: oldTrainer.firstName,
      lastName: oldTrainer.lastName,
      phone: oldTrainer.phone,
      activityId: oldTrainer.activityId,
      salary: oldTrainer.salary,
      status: oldTrainer.status,
    };
    trainers.push(newTrainer);
    fs.writeFile('src/data/trainer.json', JSON.stringify(trainers, null, 2), (err) => {
      if (err) {
        res.status(400).json({ msg: 'Error! Trainer cant be created' });
      } else {
        res.status(200).json({ msg: 'Trainer created!', data: newTrainer });
      }
    });
  }
}); */

module.exports = {
  getAllTrainers,
};
