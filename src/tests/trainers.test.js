import request from 'supertest';
import app from '../app';
import trainersSeed from '../seeds/trainers';
import Trainer from '../models/Trainer';

const mockTrainer = {
  firstName: 'Julian',
  lastName: 'Alvarez',
  dni: '40809097',
  phone: '1145768909',
  email: 'laaraña@gmail.com',
  city: 'pepitojuarez',
  password: 'guardiolaelkpo3',
  salary: 40000000,
};

beforeAll(async () => {
  await Trainer.collection.insertMany(trainersSeed);
});

describe('GET/api/trainers', () => {
  test('Succesfull 200 response', async () => {
    const res = await request(app).get('/api/trainers').send();
    expect(res.status).toBe(200);
    expect(res.error).toBeFalsy();
  });
  test('Should get a 404 response', async () => {
    const res = await request(app).get('/api/trainer').send();
    expect(res.status).toBe(404);
    expect(res.error).toBeTruthy();
  });
  test('Return 4 trainers', async () => {
    const res = await request(app).get('/api/trainers').send();
    expect(res.body.data.length).toBe(4);
    expect(res.error).toBeFalsy();
  });
});

describe('GET/api/trainers/:id', () => {
  test('Succesfull 200 response', async () => {
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

describe('POST/api/trainers', () => {
  test('Should create successfully a trainer', async () => {
    const res = await request(app).post('/api/trainers').send(mockTrainer);
    expect(res.status).toBe(201);
    expect(res.error).toBeFalsy();
  });
  test('Should get a 404 response', async () => {
    const res = await request(app).post('/api/trainer').send(mockTrainer);
    expect(res.status).toBe(404);
    expect(res.error).toBeTruthy();
  });
});
