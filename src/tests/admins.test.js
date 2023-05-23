import request from 'supertest';
import app from '../app';

import Admin from '../models/Admin';
import adminSeed from '../seeds/admins';

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
  await Admin.collection.insertMany(adminSeed);
});

describe('POST /api/admins', () => {
  test('POST: Should return a status 201 when an new admin is created', async () => {
    const response = await request(app)
      .post('/api/admins')
      .send(mockAdmin);
    expect(response.statusCode).toBe(201);
  });
  test('POST: Admin should have a valid password', async () => {
    const response = await request(app)
      .post('/api/admins')
      .send(mockAdmin);
    const admin = response.body.data;
    expect(admin.password).toMatch(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);
  });
  test('POST: A new admin should be added to the database', async () => {
    let response = await request(app)
      .post('/api/admins')
      .send(mockAdmin);
    // eslint-disable-next-line no-underscore-dangle
    const newAdminId = response.body.data._id;
    response = await request(app)
      .get(`/api/admins/${newAdminId}`);
    expect(response.statusCode).toBe(200);
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
