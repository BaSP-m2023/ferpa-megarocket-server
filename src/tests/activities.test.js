import request from 'supertest';
import app from '../app';
import Activity from '../models/Activity';
import activitiesSeed from '../seeds/activities';

let mockId;
const mockActivity = {
  name: 'Muay thai',
  description: 'This is an martial art ....',
  isActive: true,
};
const mockActivityPut = {
  name: 'Kick boxing',
  description: 'Kickboxing is a group of foot combat sports...',
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
  test('this should give you only 1 activity', async () => {
    const response = await request(app).get('/api/activities/64693ee0ed79af5a83aac57c').send();
    expect(response.body.data.name).toBe('Megacrossfit');
  });
});

describe('POST /api/activities', () => {
  test('verifies that a new activity was succesfully created', async () => {
    const responseGet = await request(app).get('/api/activities').send();
    expect(responseGet.status).toBe(200);
    const response = await request(app).post('/api/activities').send(mockActivity);
    expect(response.status).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    mockId = response.body.data._id;
    const responseGet2 = await request(app).get('/api/activities').send();
    expect(responseGet.body.data.length).toBeLessThan(responseGet2.body.data.length);
  });
});

describe('PUT /api/activities', () => {
  test('verifies that an activity was succesfully updated', async () => {
    const response = await request(app).put(`/api/activities/${mockId}`).send(mockActivityPut);
    expect(response.body.data.name).toBe(mockActivityPut.name);
    expect(response.body.data.description).toBe(mockActivityPut.description);
    expect(response.status).toBe(200);
  });
});

describe('DELETE /api/activities', () => {
  test('verifies that an activity was succesfully deleted', async () => {
    const responseGet = await request(app).get('/api/activities').send();
    expect(responseGet.status).toBe(200);
    const response = await request(app).delete(`/api/activities/${mockId}`).send();
    expect(response.status).toBe(200);
    const responseGet2 = await request(app).get('/api/activities').send();
    expect(responseGet.body.data.length).toBeGreaterThan(responseGet2.body.data.length);
  });
});
