import request from 'supertest';
import app from '../app';

import Subscription from '../models/Subscription';
import Member from '../models/Member';
import Class from '../models/Class';

import subSeed from '../seeds/subscriptions';
import memberSeed from '../seeds/members';
import classSeed from '../seeds/classes';

const mockSubscription = {
  classId: '6462d8c5afd4e4d023690d66',
  memberId: '646243a5b74486265babed72',
  date: '2023-05-21',
};

const mockSubscription2 = {
  classId: '6462d8c5afd4e4d023690d66',
  memberId: '646243a5b74486265babed72',
  date: '2023-05-25',
};

beforeAll(async () => {
  await Subscription.collection.insertMany(subSeed);
  await Member.collection.insertMany(memberSeed);
  await Class.collection.insertMany(classSeed);
});

describe('GET /api/subscriptions', () => {
  test('GET ALL', async () => {
    const response = await request(app).get('/api/subscriptions/').send();
    console.log(response.body.data);
    expect(response.status).toBe(200);
  });
});

describe('GET /api/subscriptions', () => {
  test('GET ALL', async () => {
    const response = await request(app).get('/api/subscriptions/all').send();
    expect(response.body.data.length).toBe(2);
    expect(response.status).toBe(200);
  });
  test('GET BY ID: should return the name Juan from the selected subscription', async () => {
    const response = await request(app).get('/api/subscriptions/646936a8c657bcbd138eaf3c').send();
    expect(response.body.data.memberId.firstName).toBe('Juan');
  });
});

describe('POST /api/subscriptions', () => {
  test('POST: the length of the data should increase by 1 unit', async () => {
    let response = await request(app).get('/api/subscriptions/all').send();
    const seedLength = response.body.data.length;
    response = await request(app).post('/api/subscriptions/').send(mockSubscription);
    expect(response.status).toBe(201);
    response = await request(app).get('/api/subscriptions/all').send();
    const seedPostLength = response.body.data.length;
    expect(seedLength + 1).toBe(seedPostLength);
  });
  test('POST: should return the last name Martinez from the selected subscription', async () => {
    let response = await request(app).post('/api/subscriptions/').send(mockSubscription2);
    expect(response.status).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    const subId = response.body.data._id;
    response = await request(app).get(`/api/subscriptions/${subId}`).send();
    expect(response.body.data.memberId.lastName).toBe('Martinez');
  });
});
