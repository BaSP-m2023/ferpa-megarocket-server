import request from 'supertest';
import app from '../app';

import Subscription from '../models/Subscription';
import Member from '../models/Member';
import Class from '../models/Class';

import subSeed from '../seeds/subscriptions';
import memberSeed from '../seeds/members';
import classSeed from '../seeds/classes';

let subId;

const currentDate = new Date();
const outOfWeekDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate() - currentDate.getDay() - 14,
);

const mockSubscription = {
  classId: '6462d8c5afd4e4d023690d66',
  memberId: '646243a5b74486265babed72',
  date: new Date(),
};

const mockSubscription2 = {
  classId: '6462d8c5afd4e4d023690d66',
  memberId: '646243a5b74486265babed72',
  date: outOfWeekDate,
};

beforeAll(async () => {
  await Subscription.collection.insertMany(subSeed);
  await Member.collection.insertMany(memberSeed);
  await Class.collection.insertMany(classSeed);
});

describe('GET THIS WEEK SUB /api/subscriptions', () => {
  test('GET THIS WEEK SUB: should return 1 subscription in data', async () => {
    const response = await request(app).get('/api/subscriptions/').send();
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
  });
});

describe('GET /api/subscriptions', () => {
  test('GET: should return 2 subscriptions in data', async () => {
    const response = await request(app).get('/api/subscriptions/all').send();
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2);
  });
  test('GET BY ID: should return the name Juan from the selected subscription', async () => {
    const response = await request(app).get('/api/subscriptions/646936a8c657bcbd138eaf3c').send();
    expect(response.body.data.memberId.dni).toBe('362355133456');
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
  test('POST: should return the dni: 362355133456 from the member of the new subscription', async () => {
    let response = await request(app).post('/api/subscriptions/').send(mockSubscription2);
    // eslint-disable-next-line no-underscore-dangle
    expect(response.status).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    subId = response.body.data._id;
    response = await request(app).get(`/api/subscriptions/${subId}`).send();
    expect(response.body.data.memberId.dni).toBe('362355133456');
  });
});

describe('DELETE /api/subscriptions', () => {
  test('DELETE: the length of the data should decrease by 1 unit', async () => {
    let response = await request(app).get('/api/subscriptions/all').send();
    const seedLength = response.body.data.length;
    response = await request(app).delete(`/api/subscriptions/${subId}`).send();
    expect(response.status).toBe(200);
    response = await request(app).get('/api/subscriptions/all').send();
    const seedDeleteLength = response.body.data.length;
    expect(seedLength - 1).toBe(seedDeleteLength);
  });
});

describe('PUT /api/subscriptions', () => {
  test('PUT: should check member dni and data length should be the same', async () => {
    let response = await request(app).get('/api/subscriptions/all').send();
    const seedLength = response.body.data.length;
    response = await request(app).get('/api/subscriptions/646936a8c657bcbd138eaf3c').send(mockSubscription2);
    expect(response.status).toBe(200);
    expect(response.body.data.memberId.dni).toBe('362355133456');
    response = await request(app).get('/api/subscriptions/all').send();
    const seedPutLength = response.body.data.length;
    expect(seedLength).toBe(seedPutLength);
  });
});
