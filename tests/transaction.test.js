/* eslint-disable no-undef */
import supertest from 'supertest';
import createTransactions from '../src/factories/transactionFactory.js';
import { createUser, userSession } from '../src/factories/userFactory.js';
import connection from '../src/database/database.js';
import app from '../src/app.js';

beforeEach(async () => {
  const user = await createUser();
  await userSession(user.id);
  await createTransactions(user.id);
});

afterAll(async () => {
  connection.end();
});

describe('GET /transaction', () => {
  it('returns 200 for valid transaction', async () => {
    const result = await supertest(app)
      .get('/transaction');

    expect(result.status).toEqual(200);
    expect(result.body[0]).toHaveProperty('id');
    expect(result.body[0]).toHaveProperty('art_stock_id');
    expect(result.body[0]).toHaveProperty('carrier_quantity');
    expect(result.body[0]).toHaveProperty('user_id');
    expect(result.body[0]).toHaveProperty('status_id');
    expect(result.body[0]).toHaveProperty('upadate_status_date');
  });
});

describe('Post /transaction', () => {
  test('returns 200 for valid transaction', async () => {
    const user = await createUser();
    const token = await userSession(user.id);
    const transaction = await createTransactions(user.id);
    const result = await supertest(app)
      .post('/transaction')
      .send({
        stockId: transaction.art_stock_id,
        cont: transaction.carrier_quantity,
        user_id: transaction.user_id,
        cart: transaction.status_id,
        userToken: token,
      });
    expect(result.status).toEqual(200);
  });
});
