import request from 'supertest';
import app from '../app';
import Subscription from '../models/Subscription';
import subSeed from '../seeds/subscriptions';

// const mockSubscription = {
//   _class: '646568d3cbb18b2c47234960',
//   member: '6462439ab74486265babed70',
//   date: '2023-05-21'
// };

beforeAll(async () => {
  await Subscription.collection.insertMany(subSeed);
});

test('should pass a basic test', () => {
  expect(1 + 1).toBe(2);
});

describe('GET /api/subscriptions', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/subscriptions').send();
    console.log(response.body);
    expect(response.status).toBe(200);
  });
});

describe('GET /api/subscriptions/:id', () => {
  test('titulo', async () => {
    const response = await request(app).get('/api/subscriptions/646936a8c657bcbd138eaf3c').send();
    console.log(response.body.data);
  });
});
