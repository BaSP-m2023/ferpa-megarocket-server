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
  city: 'manchester',
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
  });
  test('Should get a 404 response', async () => {
    const res = await request(app).get('/api/trainer').send();
    expect(res.status).toBe(404);
  });
  test('should return a valid JSON response', async () => {
    const response = await request(app).get('/api/members').send();
    expect(response.header['content-type']).toMatch(/application\/json/);
  });
  test('Return 4 trainers', async () => {
    const res = await request(app).get('/api/trainers').send();
    expect(res.body.data.length).toBe(4);
  });
  test('Succesfull 200 response with an ID', async () => {
    const res = await request(app).get('/api/trainers/64667332ecb50c522415bea5').send();
    expect(res.status).toBe(200);
  });
  test('Should get a 404 response on an ID', async () => {
    const res = await request(app).get('/api/trainers/64667332ecb50c522415bea2').send();
    expect(res.status).toBe(404);
  });
  test('Should get a 400 response on an ID', async () => {
    const res = await request(app).get('/api/trainers/6466733').send();
    expect(res.status).toBe(400);
  });
});

describe('POST/api/trainers', () => {
  test('Should return a 200 response', async () => {
    const res = await request(app).post('/api/trainers').send(mockTrainer);
    expect(res.status).toBe(201);
  });
  test('Should get a 404 response when try to create a trainer', async () => {
    const res = await request(app).post('/api/trainer').send(mockTrainer);
    expect(res.status).toBe(404);
  });
  test('Should return a valid JSON response', async () => {
    const response = await request(app).get('/api/members').send();
    expect(response.header['content-type']).toMatch(/application\/json/);
  });
  test('Should create a trainer and return the new succesfully', async () => {
    let res = await request(app).post('/api/trainers').send(mockTrainer);
    // eslint-disable-next-line no-underscore-dangle
    const trainerId = res.body.data._id;
    res = await request(app).get(`/api/trainers/${trainerId}`).send();
    expect(res.status).toBe(200);
  });
});
