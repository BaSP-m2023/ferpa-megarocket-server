import request from 'supertest';
import app from '../app';
import Trainer from '../models/Trainer';
import trainerSeed from '../seeds/trainers';

const mockTrainerId = '64667332ecb50c522415bea5';

const mockTrainer = {
  firstName: 'Galo',
  lastName: 'Durante',
  dni: '37966681',
  phone: '11457345911',
  email: 'lolero@gmail.com',
  password: 'askda2314K',
  city: 'pepitojuarez',
  salary: 2355635,
  isActive: true,
};

beforeAll(async () => {
  await Trainer.collection.insertMany(trainerSeed);
});

describe('PUT /api/trainers', () => {
  test('check if the data change correctly', async () => {
    let response = await request(app).get(`/api/trainers/${mockTrainerId}`).send();
    const seedGet = response.body.data;
    response = await request(app).put(`/api/trainers/${mockTrainerId}`).send(mockTrainer);
    expect(response.status).toBe(200);
    response = await request(app).get(`/api/trainers/${mockTrainerId}`).send();
    expect(seedGet !== response.body.data).toBeTruthy();
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
