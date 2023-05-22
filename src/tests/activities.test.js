import request from 'supertest';
import app from '../app';
import Activity from '../models/Activity';
import activitiesSeed from '../seeds/activities';

const mockActivity = {
  name: 'Muay thai',
  description: 'This is an martial art ....',
  isActive: true,
};

beforeAll(async () => {
  await Activity.collection.insertMany(activitiesSeed);
});

test('should pass a basic test', () => {
  expect(1 + 1).toBe(2);
});

describe('GET /api/activities', () => {
  test('Should return status 200', async () => {
    const response = await request(app).get('/api/activities').send();
    expect(response.status).toBe(200);
  });
  test('Should return status 404', async () => {
    const response = await request(app).get('/api/activitie').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('length of array should be greater than 0', async () => {
    const response = await request(app).get('/api/activities').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('length of name should be greater than 3', async () => {
    const response = await request(app).get('/api/activities').send();
    const activitiesList = response.body.data;
    const nameLengths = activitiesList.map((activity) => activity.name.length);
    nameLengths.forEach((len) => {
      expect(len).toBeGreaterThan(3);
    });
  });
  test('length of name should be less than 30', async () => {
    const response = await request(app).get('/api/activities').send();
    const activitiesList = response.body.data;
    const nameLengths = activitiesList.map((activity) => activity.name.length);
    nameLengths.forEach((len) => {
      expect(len).toBeLessThan(30);
    });
  });
});

describe('POST /api/activities', () => {
  test('should create a new activity', async () => {
    const response = await request(app).post('/api/activities').send(mockActivity);
    expect(response.status).toBe(201);
  });
  test('lenght of name should be greater than 3', async () => {
    const response = await request(app).post('/api/activities').send(mockActivity);
    const activity = response.body.data;
    const nameLength = activity.name.length;
    expect(nameLength).toBeGreaterThan(3);
  });
  test('lenght of name should be less than 30', async () => {
    const response = await request(app).post('/api/activities').send(mockActivity);
    const activity = response.body.data;
    const nameLength = activity.name.length;
    expect(nameLength).toBeLessThan(30);
  });
});
