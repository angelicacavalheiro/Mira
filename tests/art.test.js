/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import createArts from '../src/factories/artFactory.js';

beforeEach(async () => {
  await createArts();
});

afterAll(() => {
  connection.end();
});

describe('GET /arts', () => {
  it('returns 200 for valid art', async () => {
    const result = await supertest(app)
      .get('/arts');

    expect(result.status).toEqual(200);
    expect(result.body[0]).toHaveProperty('id');
    expect(result.body[0]).toHaveProperty('art_name');
    expect(result.body[0]).toHaveProperty('artist_id');
    expect(result.body[0]).toHaveProperty('art_category_id');
    expect(result.body[0]).toHaveProperty('size');
  });
});

describe('POST /arts', () => {
  test('returns 200 when arts post is correct', async () => {
    const art = await createArts();
    const result = await supertest(app)
      .post('/arts')
      .send({
        art_name: art.name,
        artist_id: art.artist_id,
        art_category_id: art.art_category_id,
        size: art.size,
      });
    expect(result.status).toEqual(200);
  });
});
