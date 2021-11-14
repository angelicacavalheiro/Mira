import supertest from 'supertest';
import createTransactions from '../src/factories/transactionFactory.js';
import { createUser, userSession } from '../src/factories/userFactory.js';
import connection from '../src/database/database.js';
import app from '../src/app.js';

afterAll(async () => {
  connection.end();
});

describe('GET /cart', () => {
  test('returns 200 when user is logged In', async () => {
    const user = await createUser();
    const token = await userSession(user.id);
    await createTransactions(user.id);
    const result = await supertest(app)
      .get('/cart')
      .set('Authorization', `Bearer ${token}`);
    expect(result.status).toEqual(200);
    expect(result.body[0]).toHaveProperty('id');
    expect(result.body[0]).toHaveProperty('art_name');
    expect(result.body[0]).toHaveProperty('art_photo');
    expect(result.body[0]).toHaveProperty('artist_name');
    expect(result.body[0]).toHaveProperty('price');
    expect(result.body[0]).toHaveProperty('carrier_quantity');
  });

  test('returns 401 when user is NOT logged In', async () => {
    const user = await createUser();
    const token = 'token errado';
    const result = await supertest(app)
      .get('/cart')
      .set('Authorization', `Bearer ${token}`);
    expect(result.status).toEqual(401);
  });
});
