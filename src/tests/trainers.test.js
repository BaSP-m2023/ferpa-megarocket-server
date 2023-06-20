import request from 'supertest';
import app from '../app';
import trainersSeed from '../seeds/trainers';
import Trainer from '../models/Trainer';

const mockTrainer = {
  firstName: 'Julian',
  lastName: 'Alvarez',
  dni: '12345679',
  phone: '1234567890',
  email: 'laaraña@gmail.com',
  city: 'manchester',
  password: 'Guardiolaelkpo3',
  salary: 40000000,
};

const mockTrainerId = '64667332ecb50c522415bea5';

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
  test('Should return a valid JSON response', async () => {
    const response = await request(app).get('/api/trainers').send();
    expect(response.header['content-type']).toMatch(/application\/json/);
  });
  test('Return 1 trainers', async () => {
    const res = await request(app).get('/api/trainers').send();
    expect(res.body.data.length).toBe(1);
  });
  test('Succesfull 200 response with an ID', async () => {
    const res = await request(app).get('/api/trainers/64667332ecb50c522415bea5').send();
    expect(res.status).toBe(200);
  });
  test('Should return an error with a non-existent ID', async () => {
    const res = await request(app).get('/api/trainers/64667332ecb50c522415bea2').send();
    expect(res.status).toBe(404);
  });
  test('Should return an error with an invalid ID format', async () => {
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
    const response = await request(app).get('/api/trainers').send();
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

describe('PUT /api/trainers', () => {
  test('check if the data change correctly', async () => {
    let response = await request(app).get(`/api/trainers/${mockTrainerId}`).send();
    const seedGetDni = response.body.data.dni;
    response = await request(app).put(`/api/trainers/${mockTrainerId}`).send(mockTrainer);
    expect(response.status).toBe(200);
    response = await request(app).get(`/api/trainers/${mockTrainerId}`).send();
    expect(response.body.data.dni !== seedGetDni).toBeTruthy();
  });
  test('should return status 200', async () => {
    const response = await request(app).put(`/api/trainers/${mockTrainerId}`).send(mockTrainer);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return status 404', async () => {
    const response = await request(app).post('/api/trainer').send(mockTrainer);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('DELETE /api/trainers', () => {
  test('check if the database is decreased by 1', async () => {
    let response = await request(app).get('/api/trainers').send();
    const seedLength = response.body.data.length;

    response = await request(app).delete(`/api/trainers/${mockTrainerId}`);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();

    response = await request(app).get('/api/trainers').send();
    const seedPostL = response.body.data.length;

    expect(seedLength - 1).toBe(seedPostL);
  });
  test('should return status 404', async () => {
    const response = await request(app).delete(`/api/trainer/${mockTrainerId}`).send(mockTrainer);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('should not delete a trainer that was previously deleted', async () => {
    const response = await request(app).delete(`/api/trainers/${mockTrainerId}`);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});
