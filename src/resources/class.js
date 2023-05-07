const express = require('express');

const fs = require('fs');

const classes = require('../data/class.json');

const router = express.Router();

router.get('/get', (req, res) => {
  res.send(classes);
});

/* Put method */

/* router.put('/editById/:id', (req, res) => {
  const classId = req.params.id;
}); */

/* Delete method */

router.delete('/deleteById/:id', (req, res) => {
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
