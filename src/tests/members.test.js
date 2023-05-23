import request from 'supertest';
import app from '../app';
import Member from '../models/Member';
import memberSeed from '../seeds/members';

let mockMemberId;

const mockMember = {
  firstName: 'Pru',
  lastName: 'Eba',
  dni: '362355523456',
  phone: '3625565',
  email: 'mockMail@il.com',
  city: 'Rosario',
  birthDay: '1999-05-03T03:00:00.000Z',
  postalCode: '1334',
  isActive: true,
  membership: 'Black',
};

const mockMemberUpdate = {
  firstName: 'Pruebaa',
  lastName: 'Ebaaaa',
  city: 'BSAS',
  membership: 'Classic',
};

beforeAll(async () => {
  await Member.collection.insertMany(memberSeed);
});

describe('POST /api/Members', () => {
  test('members length should be 3', async () => {
    const response = await request(app).get('/api/members').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.data.length).toBe(3);
  });
  test('should return status 404', async () => {
    const response = await request(app).post('/api/Member/invalid').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('should create an employee with status 201', async () => {
    const response = await request(app).post('/api/Members').send(mockMember);
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
    // eslint-disable-next-line no-underscore-dangle
    mockMemberId = response.body.data._id;
  });
  test('should return the created member in the response body', async () => {
    const response = await request(app).get(`/api/Members/${mockMemberId}`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toMatchObject(mockMember);
  });
  test('members length should be 4', async () => {
    const response = await request(app).get('/api/members').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.data.length).toBe(4);
  });
});

describe('GET /api/members/', () => {
  test('should show members and return status 200', async () => {
    const response = await request(app).get('/api/members').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return status 404', async () => {
    const response = await request(app).get('/api/Member/invalid').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('should return members with a valid JSON response', async () => {
    const response = await request(app).get('/api/members').send();
    expect(response.header['content-type']).toMatch(/application\/json/);
  });
  test('members length should be 4', async () => {
    const response = await request(app).get('/api/members').send();
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(4);
  });
  test('should return the created member and return 200', async () => {
    const response = await request(app).get(`/api/Members/${mockMemberId}`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toMatchObject(mockMember);
  });
  test('should return a member with a valid JSON response', async () => {
    const response = await request(app).get(`/api/members/${mockMemberId}`).send();
    expect(response.header['content-type']).toMatch(/application\/json/);
  });
  test('should not find member and return status 404', async () => {
    const response = await request(app).get('/api/members/6462439ab74486265babed00').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('should not search for members and return status 400', async () => {
    const response = await request(app).get('/api/members/000').send();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('should return status 404', async () => {
    const response = await request(app).get(`/api/members/invalid/${mockMemberId}`).send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('PUT /api/Members', () => {
  test('should return the updated member in the response body', async () => {
    let response = await request(app).get(`/api/Members/${mockMemberId}`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toMatchObject(mockMember);
    response = await request(app).put(`/api/Members/${mockMemberId}`).send(mockMemberUpdate);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    response = await request(app).get(`/api/Members/${mockMemberId}`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toMatchObject({
      firstName: mockMemberUpdate.firstName,
      lastName: mockMemberUpdate.lastName,
      dni: mockMember.dni,
      phone: mockMember.phone,
      email: mockMember.email,
      city: mockMemberUpdate.city,
      birthDay: mockMember.birthDay,
      isActive: mockMember.isActive,
      membership: mockMemberUpdate.membership,
    });
  });
  test('should not find member and return status 404', async () => {
    const response = await request(app).put('/api/members/6462439ab74486265babed00').send(mockMemberUpdate);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('should return status 400', async () => {
    const response = await request(app).put('/api/members/6462439ab74486265babed0').send(mockMemberUpdate);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('should return status 404', async () => {
    const response = await request(app).put(`/api/members/invalid/${mockMemberId}`).send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('DELETE /api/admins', () => {
  test('members length should be 4', async () => {
    const response = await request(app).get('/api/members').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.data.length).toBe(4);
  });
  test('should delete one admin', async () => {
    const response = await request(app).delete(`/api/members/${mockMemberId}`);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should not delete admin and return status 404', async () => {
    const response = await request(app).delete(`/api/members/${mockMemberId}`);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('members length should be 3', async () => {
    const response = await request(app).get('/api/members').send();
    expect(response.error).toBeFalsy();
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(3);
  });
  test('should return status 404', async () => {
    const response = await request(app).delete(`/api/members/invalid/${mockMemberId}`).send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('should return status 404', async () => {
    const response = await request(app).delete('/api/members/6462439ab74486265babed00').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('should return status 400', async () => {
    const response = await request(app).delete('/api/members/000').send();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
});
