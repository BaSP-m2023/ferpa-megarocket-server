const express = require('express');
const fs = require('fs');
const subscriptions = require('../data/subscription.json');

const router = express.Router();

router.get('/get', (req, res) => {
  res.status(200).json({
    data: subscriptions,
  });
});

router.get('/getById/:id', (req, res) => {
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

router.post('/post', (req, res) => {
  const newSubscription = req.body;
  const newSubscriptionId = parseInt(req.body.id, 10);
  const foundSubscription = subscriptions.find((subs) => subs.id === newSubscriptionId);
  if (!newSubscription.id || !newSubscription.memberId || !newSubscription.classId
        || !newSubscription.subscriptionStatus) {
    res.status(400).json({ msg: 'We need an id, member id, class id and status to create a new subscription.' });
  } else if (foundSubscription) {
    res.status(400).json({ msg: 'Subscription already exists!' });
  } else {
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

router.put('/editById/:id', (req, res) => {
  const subscriptionId = req.params.id;
  const foundSubscription = subscriptions.some((sub) => sub.id.toString() === subscriptionId);
  const editSub = req.body;
  if (foundSubscription) {
    subscriptions.forEach((sub) => {
      if (sub.id.toString() === subscriptionId) {
        const theSub = sub;
        theSub.memberId = editSub.memberId ? editSub.memberId : theSub.memberId;
        theSub.classId = editSub.classId ? editSub.classId : theSub.classId;
        theSub.subscriptionDate = editSub.subscriptionDate ? editSub.subscriptionDate
          : theSub.subscriptionDate;
        theSub.subscriptionType = editSub.subscriptionType ? editSub.subscriptionType
          : theSub.subscriptionType;
        theSub.subscriptionPrice = editSub.subscriptionPrice ? editSub.subscriptionPrice
          : theSub.subscriptionPrice;
        theSub.subscriptionDuration = editSub.subscriptionDuration ? editSub.subscriptionDuration
          : theSub.subscriptionDuration;
        theSub.subscriptionStatus = editSub.subscriptionStatus ? editSub.subscriptionStatus
          : theSub.subscriptionStatus;
        fs.writeFile('src/data/subscription.json', JSON.stringify(subscriptions, null, 2), (err) => {
          if (err) {
            res.status(400).json({ msg: `ERROR updating subscription ${subscriptionId}` });
          } else {
            res.status(200).json({ msg: `Subscription ${subscriptionId} updated succesfully` });
          }
        });
        res.status(200).json({
          msg: `Subscription ${subscriptionId} updated succesfully`,
          data: theSub,
        });
      }
    });
  } else {
    res.status(400).json({ msg: `ERROR updating a subscription ${subscriptionId}` });
  }
});

router.delete('/deleteById/:id', (req, res) => {
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
