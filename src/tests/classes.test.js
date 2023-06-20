import request from 'supertest';
import app from '../app';
import Class from '../models/Class';
import classes from '../seeds/classes';
import Trainer from '../models/Trainer';
import trainers from '../seeds/trainers';
import Activity from '../models/Activity';
import activities from '../seeds/activities';

const mockClasses = {
  _id: '6462d8c5afd4e4d023690d66',
  day: 'Monday',
  hour: 15,
  trainerId: '6465a78f192b0cfa3aaa8f92',
  activityId: '6465a78f192b0cfa3aaa8f91',
  slots: 2,
};

beforeAll(async () => {
  await Class.collection.insertMany(classes);
  await Trainer.collection.insertMany(trainers);
  await Activity.collection.insertMany(activities);
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
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('should return status 200 when i put existing ID', async () => {
    const response = await request(app).get('/api/classes/648d1376a0f93d1139518f3b').send();
    expect(response.status).toBe(200);
  });

  test('should return status 404 if class does not exist', async () => {
    const response = await request(app).get('/api/classes/6462d8c5afd4e4d023690d6').send();
    expect(response.status).toBe(404);
  });
});

describe('POST/api/classes', () => {
  test('should created new class', async () => {
    const response = await request(app).post('/api/classes/').send(mockClasses);
    expect(response.body.message).toBe('Class created!');
    expect(response.statusCode).toBe(201);
    expect(response.body.error).toBeFalsy();
  });

  test('Should get error 500 when you create a class', async () => {
    const res = await request(app).post('/api/classes').send();
    expect(res.status).toBe(500);
    expect(res.error).toBeTruthy();
  });
});

describe('DELETE/api/classes', () => {
  test('should delete class by ID', async () => {
    const response = await request(app).delete('/api/classes/648d1376a0f93d1139518f3b').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });

  test('should return error when try to find the ID deleted', async () => {
    const response = await request(app).get('/api/classes/6462d8c5afd4e4d023690d64').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});
