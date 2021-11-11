/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import createStock from '../src/factories/stockFactory.js';

beforeEach(async () => {
  await createStock();
});

// afterAll(async () => {
//   await connection.query('DELETE FROM stock;');
//   await connection.query('DELETE FROM arts;');
//   await connection.query('DELETE FROM art_category;');
//   await connection.query('DELETE FROM artists;');
//   await connection.query('DELETE FROM galeries;');
// });

afterAll(() => {
  connection.end();
});

describe('GET /stock', () => {
  it('returns 200 for valid stock', async () => {
    const result = await supertest(app).get('/stock');

    expect(result.status).toEqual(200);
    expect(result.body[0]).toHaveProperty('id');
    expect(result.body[0]).toHaveProperty('art_id');
    expect(result.body[0]).toHaveProperty('galery_id');
    expect(result.body[0]).toHaveProperty('price');
    expect(result.body[0]).toHaveProperty('quantity');
    expect(result.body[0]).toHaveProperty('update_date');
    expect(result.body[0]).toHaveProperty('art_photo');
  });
});

describe('POST /stock', () => {
  test('returns 200 when stock post is correct', async () => {
    const stock = await createStock();
    const result = await supertest(app).post('/stock').send({
      art_id: stock.art_id,
      galery_id: stock.galery_id,
      price: stock.price,
      quantity: stock.quantity,
      update_date: stock.update_date,
      art_photo: stock.art_photo,
    });
    expect(result.status).toEqual(200);
  });
});
