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
  test('POST: Should return a status 201', async () => {
    const response = await request(app)
      .post('/api/admins')
      .send(mockAdmin);
    expect(response.statusCode).toBe(201);
  });
  test('POST: Should have a valid password', async () => {
    const response = await request(app).post('/api/admins').send(mockAdmin);
    const admin = response.body.data;
    expect(admin.password).toMatch(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);
  });
});
