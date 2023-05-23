import request from 'supertest';
import app from '../app';
import superAdmin from '../models/SuperAdmin';
import superAdminSeed from '../seeds/super-admins';

const mockSuperAdmin = {
  email: 'superadmin@gmail.com',
  password: 'Superadmin123$',
};
let superAdminId;

beforeAll(async () => {
  await superAdmin.collection.insertMany(superAdminSeed);
});

describe('GET/api/super-admins', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/super-admins/646559fa790279963b1e35e2').send();
    expect(response.status).toBe(200);
  });
  test('super admins should be 3', async () => {
    const res = await request(app).get('/api/super-admins').send();
    expect(res.body.data.length).toBe(3);
  });
  test('the id 646559fa790279963b1e35e2 should content email = marcos@gmail.com', async () => {
    const response = await request(app).get('/api/super-admins/646559fa790279963b1e35e2').send();
    expect(response.body.data.email).toEqual('marcos@gmail.com');
  });
  test('the id 646559fa790279963b1e35e2 password value should be, password = Marcos123$', async () => {
    const response = await request(app).get('/api/super-admins/646559fa790279963b1e35e2').send();
    expect(response.body.data.password).toEqual('Marcos123$');
  });
});

describe('POST /api/super-admins', () => {
  test('should create a super admin with status 201', async () => {
    const response = await request(app).post('/api/super-admins').send(mockSuperAdmin);
    expect(response.status).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    superAdminId = response.body.data._id;
  });
  test('should create a super admin with email and password fields', async () => {
    const response = await request(app).post('/api/super-admins').send(mockSuperAdmin);
    expect(response.body.data.email).toBeDefined();
    expect(response.body.data.password).toBeDefined();
  });
  test('In email should have a gmail account', async () => {
    const response = await request(app).post('/api/super-admins').send(mockSuperAdmin);
    expect(response.body.data.email).toContain('@gmail.com');
  });
  test('Should create a super admin and return a new succesfully', async () => {
    let res = await request(app).post('/api/super-admins').send(mockSuperAdmin);
    // eslint-disable-next-line no-underscore-dangle
    superAdminId = res.body.data._id;
    res = await request(app).get(`/api/super-admins/${superAdminId}`).send();
    expect(res.status).toBe(200);
  });
});

const mockUpdate = {
  email: 'mateo@gmail.com',
  password: 'Mateo123$',
};

describe('PUT/api/super-admins', () => {
  test('should edit a super admin with status 200', async () => {
    const response = await request(app).put('/api/super-admins/646559fa790279963b1e35e2').send(mockUpdate);
    expect(response.status).toBe(200);
  });
  test('check if data is correct', async () => {
    let response = await request(app).get(`/api/super-admins/${superAdminId}`).send(mockUpdate);
    const seedGet = response.body.data;
    response = await request(app).put(`/api/super-admins/${superAdminId}`).send(mockUpdate);
    expect(response.status).toBe(200);
    response = await request(app).get(`/api/super-admins/${superAdminId}`).send();
    expect(seedGet !== response.body.data).toBeTruthy();
  });
  test('should return status 404', async () => {
    const response = await request(app).put('/api/super-admins/').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('DELETE /api/super-admins', () => {
  test('should not delete a super admin with status 400', async () => {
    const response = await request(app).delete('/api/super-admins/646889fa79027991e35e2').send();
    expect(response.status).toBe(400);
  });
  test('check if the database is decreased by 1', async () => {
    let response = await request(app).get('/api/super-admins').send();
    const seedLength = response.body.data.length;

    response = await request(app).delete(`/api/super-admins/${superAdminId}`);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();

    response = await request(app).get('/api/super-admins').send();
    const seedPostL = response.body.data.length;

    expect(seedLength - 1).toBe(seedPostL);
  });
});
