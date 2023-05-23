import request from 'supertest';
import app from '../app';
import Class from '../models/Class';
import classes from '../seeds/classes';
import Trainer from '../models/Trainer';
import trainers from '../seeds/trainers';
// import Activity from '../models/Activity';
// import activities from '../seeds/activities';

/* const mockclasses = {
  _id: '6462d8c5afd4e4d023690d66',
  day: 'Monday',
  hour: 15,
  trainerId: '6465a78f192b0cfa3aaa8f92',
  activityId: '6465a78f192b0cfa3aaa8f91',
  slots: 2,
}; */

beforeAll(async () => {
  await Class.collection.insertMany(classes);
  await Trainer.collection.insertMany(trainers);
// await Activity.collection.insertMany(activities);
});

describe('GET/api/classes', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/classes').send();
    expect(response.status).toBe(200);
  });

  test('error should be status 404', async () => {
    const response = await request(app).get('/api/classe').send();
    expect(response.status).toEqual(404);
    expect(response.error).toBeTruthy();
  });

  test('length of array should be greater than 1', async () => {
    const response = await request(app).get('/api/classes').send();
    expect(response.body.data.length).toBeGreaterThan(1);
  });

  test('should return the class Id', async () => {
    const response = await request(app).get('/api/classes/6462d8c5afd4e4d023690d66').send();
    expect(response.status).toBe(200);
  });

  test('should return status 404 if class does not exist', async () => {
    const nonExistentId = '6462d8c5afd4e4d023690d6';
    const response = await request(app).get(`/api/classes/${nonExistentId}`).send();
    expect(response.status).toBe(404);
  });
});

/* describe('POST/api/classes', async () => {
  const response = await request(app).post('/api/classes').send(mockclasses);
  expect(response.status).toBe(201);
}); */

/* test('should fail with message: "A class with ID already exist"', async () => {
  const response = await request(app).post('/api/classes').send(mockclasses);
  expect(response.body.message).toBe('A class with ID already exist');
  expect(response.body.error).toBeTruthy();
}); */
