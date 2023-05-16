const express = require('express');
const fs = require('fs');
const subscriptions = require('../models/Subscription');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    data: subscriptions,
  });
});

router.get('/:id', (req, res) => {
  const subscriptionId = parseInt(req.params.id, 10);
  const foundSubscription = subscriptions.find((sub) => sub.id === subscriptionId);
  if (foundSubscription) {
    res.status(200).json({
      msg: 'Subscription founded!',
      data: foundSubscription,
    });
  } else {
    res.status(400).json({ msg: `No subscription with id ${subscriptionId} was found.` });
  }
});

router.post('/', (req, res) => {
  const paramSubscription = req.body;
  if (!paramSubscription.memberId || !paramSubscription.classId
        || !paramSubscription.subscriptionStatus) {
    res.status(400).json({ msg: 'We need a member id, class id and status to create a new subscription.' });
  } else {
    const valueId = subscriptions[subscriptions.length - 1].id + 1;
    const newSubscription = {
      id: valueId,
      memberId: paramSubscription.memberId,
      classId: paramSubscription.classId,
      subscriptionDate: paramSubscription.subscriptionDate,
      subscriptionType: paramSubscription.subscriptionType,
      subscriptionPrice: paramSubscription.subscriptionPrice,
      subscriptionDuration: paramSubscription.subscriptionDuration,
      subscriptionStatus: paramSubscription.subscriptionStatus,
    };
    subscriptions.push(newSubscription);
    fs.writeFile('src/data/subscription.json', JSON.stringify(subscriptions, null, 2), (err) => {
      if (err) {
        res.status(400).json({ msg: 'Error! Subscription cant be created' });
      } else {
        res.status(200).json({ msg: 'Subscription created!' });
      }
    });
  }
});

router.put('/:id', (req, res) => {
  const subscriptionId = req.params.id;
  const foundSub = subscriptions.find((sub) => sub.id.toString() === subscriptionId);
  const editSub = req.body;
  if (foundSub) {
    foundSub.memberId = editSub.memberId ? editSub.memberId : foundSub.memberId;
    foundSub.classId = editSub.classId ? editSub.classId : foundSub.classId;
    foundSub.subscriptionDate = editSub.subscriptionDate ? editSub.subscriptionDate
      : foundSub.subscriptionDate;
    foundSub.subscriptionType = editSub.subscriptionType ? editSub.subscriptionType
      : foundSub.subscriptionType;
    foundSub.subscriptionPrice = editSub.subscriptionPrice ? editSub.subscriptionPrice
      : foundSub.subscriptionPrice;
    foundSub.subscriptionDuration = editSub.subscriptionDuration ? editSub.subscriptionDuration
      : foundSub.subscriptionDuration;
    foundSub.subscriptionStatus = editSub.subscriptionStatus ? editSub.subscriptionStatus
      : foundSub.subscriptionStatus;
    fs.writeFile('src/data/subscription.json', JSON.stringify(subscriptions, null, 2), (err) => {
      if (err) {
        res.status(400).json({ msg: `ERROR updating subscription ${subscriptionId}` });
      } else {
        res.status(200).json({ msg: `Subscription ${subscriptionId} updated succesfully` });
      }
    });
    res.status(200).json({
      msg: `Subscription ${subscriptionId} updated succesfully`,
      data: foundSub,
    });
  } else {
    res.status(400).json({ msg: `ERROR updating a subscription ${subscriptionId}` });
  }
});

router.delete('/:id', (req, res) => {
  const subscriptionId = req.params.id;
  const filteredSub = subscriptions.filter((sub) => sub.id.toString() !== subscriptionId);
  if (subscriptions.length === filteredSub.length) {
    res.status(400).json({ msg: `ERROR subscription with the id ${subscriptionId} not exist` });
  } else {
    fs.writeFile('src/data/subscription.json', JSON.stringify(filteredSub, null, 2), (err) => {
      if (err) {
        res.status(400).json({ msg: `ERROR deleting subscription ${subscriptionId}` });
      } else {
        res.status(200).json({ msg: `Subscription ${subscriptionId} deleted succesfully` });
      }
    });
  }
});

module.exports = router;
