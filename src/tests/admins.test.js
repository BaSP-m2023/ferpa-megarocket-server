import request from 'supertest';
import app from '../app';
import adminsSeed from '../seeds/admins';
import Admins from '../models/Admin';

const mockAdmin = {
  firstName: 'Fer',
  lastName: 'Admin',
  dni: '12345678',
  phone: '123457890',
  email: 'admin@gmail.com',
  city: 'Rosario',
  password: 'canelones1234!',
};

beforeAll(async () => {
  await Admins.collection.insertMany(adminsSeed);
});

describe('GET/api/admins', () => {
  test('should get all admins', async () => {
    const res = await request(app).get('/api/admins').send();
    expect(res.status).toBe(200);
    expect(res.error).toBeFalsy();
  });
  test('should throw error for a wrong path and status 404', async () => {
    const res = await request(app).get('/api/admin').send();
    expect(res.status).toBe(404);
    expect(res.error).toBeTruthy();
  });
  test('should get one admin by id', async () => {
    const res = await request(app).get('/api/admins/64654f260425c5c72ff190fe').send();
    // eslint-disable-next-line no-underscore-dangle
    expect(res.body.data._id).toEqual('64654f260425c5c72ff190fe');
    expect(res.body.data.dni).toEqual('123456789');
    expect(res.status).toBe(200);
    expect(res.error).toBeFalsy();
  });
  test('should get an error for invalid id', async () => {
    const res = await request(app).get('/api/admins/64654f260425').send();
    expect(res.status).toBe(400);
    expect(res.error).toBeTruthy();
  });
  test('must throw an error for non-existent id', async () => {
    const res = await request(app).get('/api/admins/64654f260425c5c72ff190fa').send();
    expect(res.status).toBe(404);
    expect(res.error).toBeTruthy();
  });
});

describe('PUT/api/admins/:id', () => {
  test('you must update an admin', async () => {
    const updAdmin = { firstName: 'Juan', lastName: 'Admin', dni: '122334455' };
    const response = await request(app).put('/api/admins/646550c10425c5c72ff19102').send(updAdmin);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    const res = await request(app).get('/api/admins/646550c10425c5c72ff19102').send();
    // eslint-disable-next-line no-underscore-dangle
    expect(res.body.data._id).toEqual('646550c10425c5c72ff19102');
    expect(res.body.data.dni).toEqual('122334455');
    expect(res.status).toBe(200);
  });
  test('should not update an admin for invalid by id', async () => {
    const updAdmin = { firstName: 'Juan', lastName: 'Admin', dni: '123456789' };
    const res = await request(app).put('/api/admins/646550c10425c5c7').send(updAdmin);
    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
  });
  test('should not update an admin for non-existent id', async () => {
    const updAdmin = { firstName: 'Juan', lastName: 'Admin', dni: '123456789' };
    const res = await request(app).put('/api/admins/646550c10425c5c72ff19103').send(updAdmin);
    expect(res.status).toBe(404);
    expect(res.body.error).toBeTruthy();
  });
});

describe('POST /api/admins', () => {
  test('POST: Should return a status 201', async () => {
    const response = await request(app)
      .post('/api/admins')
      .send(mockAdmin);
    expect(response.statusCode).toBe(201);
  });
  test('POST: Should return a status 400', async () => {
    const response = await request(app)
      .post('/api/admins')
      .send('hello');
    expect(response.statusCode).toBe(400);
  });
  test('POST: A new admin should be added to the database', async () => {
    let response = await request(app)
      .post('/api/admins')
      .send(mockAdmin);
    expect(response.statusCode).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    const newAdminId = response.body.data._id;
    const newAdminEmail = response.body.data.email;
    response = await request(app)
      .get(`/api/admins/${newAdminId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.email).toBe(newAdminEmail);
  });
  test('POST: The length of the data should increase by one', async () => {
    let response = await request(app)
      .get('/api/admins');
    expect(response.statusCode).toBe(200);
    const dataLengthBeforePost = response.body.data.length;
    response = await request(app)
      .post('/api/admins/')
      .send(mockAdmin);
    expect(response.statusCode).toBe(201);
    response = await request(app)
      .get('/api/admins/');
    const dataLengthAfterPost = response.body.data.length;
    expect(dataLengthBeforePost + 1).toBe(dataLengthAfterPost);
  });
});

describe('DELETE /api/admins:id', () => {
  test('DELETE: Should return a status 400 when this route is hit', async () => {
    const response = await request(app)
      .delete('/api/admins/64654');
    expect(response.statusCode).toBe(400);
  });
  test('DELETE: Should return a status 404 when this route is hit', async () => {
    const response = await request(app)
      .delete('/api/admins/64654f260425c5c72ff190fd');
    expect(response.statusCode).toBe(404);
  });
  test('DELETE: Should delete one admin from the database', async () => {
    let response = await request(app)
      .get('/api/admins/64654f260425c5c72ff190fe');
    expect(response.statusCode).toBe(200);
    response = await request(app)
      .delete('/api/admins/64654f260425c5c72ff190fe');
    response = await request(app)
      .get('/api/admins/64654f260425c5c72ff190fe');
    expect(response.statusCode).toBe(404);
  });
});
