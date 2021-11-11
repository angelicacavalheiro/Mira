import supertest from 'supertest';
import createTransactions from '../src/factories/transactionFactory.js';
import { createUser, userSession } from '../src/factories/userFactory.js';
import connection from '../src/database/database.js';
import app from '../src/app.js';

afterAll(async () => {
  connection.end();
});

describe('GET /checkout', () => {
  test('returns 200 when user is logged In AND item in Stock', async () => {
    const user = await createUser();
    const token = await userSession(user.id);
    await createTransactions(user.id);
    const result = await supertest(app)
      .get('/checkout')
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
      .get('/checkout')
      .set('Authorization', `Bearer ${token}`);
    expect(result.status).toEqual(401);
  });

  test('returns 405 when user is logged In AND item OUT OF Stock', async () => {
    const user = await createUser();
    const token = await userSession(user.id);
    const transaction = await createTransactions(user.id);
    const transactionId = transaction.id;
    const bigNumber = 1000000;
    await connection.query(`UPDATE transactions SET carrier_quantity = ${bigNumber} WHERE id = ${Number(transactionId)}`);
    const result = await supertest(app)
      .get('/checkout')
      .set('Authorization', `Bearer ${token}`);
    expect(result.status).toEqual(405);
  });
});
