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
});
