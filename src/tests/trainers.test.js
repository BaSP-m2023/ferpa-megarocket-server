import request from 'supertest';
import app from '../app';
import trainersSeed from '../seeds/trainers';
import Trainer from '../models/Trainer';

beforeAll(async () => {
  await Trainer.collection.insertMany(trainersSeed);
});

describe('GET/api/trainers', () => {
  test('succesfull 200 response', async () => {
    const res = await request(app).get('/api/trainers').send();
    expect(res.status).toBe(200);
    expect(res.error).toBeFalsy();
  });
  test('Should get a 404 response', async () => {
    const res = await request(app).get('/api/trainer').send();
    expect(res.status).toBe(404);
    expect(res.error).toBeTruthy();
  });
});

describe('GET/api/trainers/:id', () => {
  test('succesfull 200 response', async () => {
    const res = await request(app).get('/api/trainers/64667332ecb50c522415bea5').send();
    expect(res.status).toBe(200);
    expect(res.error).toBeFalsy();
  });
  test('Should get a 404 response', async () => {
    const res = await request(app).get('/api/trainer/64667332ecb50c522415bea2').send();
    expect(res.status).toBe(404);
    expect(res.error).toBeTruthy();
  });
});
