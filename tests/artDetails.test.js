/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import artIdFacotry from '../src/factories/artWithParamFactory';

afterAll(() => {
  connection.end();
});

describe('GET /art/:idArt', () => {
  it('returns 200 for valid art_id', async () => {
    const art_id = await artIdFacotry();
    const result = await supertest(app)
      .get(`/art/${art_id}`);
    const { status } = result;

    expect(status).toEqual(200);
    expect(result.body[0]).toHaveProperty('id');
    expect(result.body[0]).toHaveProperty('art_name');
    expect(result.body[0]).toHaveProperty('artist_id');
    expect(result.body[0]).toHaveProperty('art_category_id');
    expect(result.body[0]).toHaveProperty('size');
    expect(result.body[0]).toHaveProperty('artist_name');
    expect(result.body[0]).toHaveProperty('description');
    expect(result.body[0]).toHaveProperty('galery_name');
    expect(result.body[0]).toHaveProperty('art_id');
    expect(result.body[0]).toHaveProperty('galery_id');
    expect(result.body[0]).toHaveProperty('price');
    expect(result.body[0]).toHaveProperty('quantity');
    expect(result.body[0]).toHaveProperty('update_date');
    expect(result.body[0]).toHaveProperty('art_photo');
  });
});
