import request from 'supertest';
import app from '../app';
import adminsSeed from '../seeds/admins';
import Admins from '../models/Admin';

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
    expect(res.body.data.firstName).toEqual('Euge');
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
    const updAdmin = { firstName: 'Juan', lastName: 'Admin', dni: '123456789' };
    const response = await request(app).put('/api/admins/646550c10425c5c72ff19102').send(updAdmin);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    const res = await request(app).get('/api/admins/646550c10425c5c72ff19102').send();
    // eslint-disable-next-line no-underscore-dangle
    expect(res.body.data._id).toEqual('646550c10425c5c72ff19102');
    expect(res.body.data.firstName).toEqual('Juan');
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
