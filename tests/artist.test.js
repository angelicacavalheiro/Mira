/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import createArtist from '../src/factories/artistFactory.js';

beforeEach(async () => {
  await createArtist();
});

afterAll(() => {
  connection.end();
});

describe('GET /artists', () => {
  it('returns 200 for valid artist', async () => {
    const result = await supertest(app)
      .get('/artists');

    expect(result.status).toEqual(200);
    expect(result.body[0]).toHaveProperty('id');
    expect(result.body[0]).toHaveProperty('artist_name');
    expect(result.body[0]).toHaveProperty('description');
    expect(result.body[0]).toHaveProperty('photo');
  });
});

describe('POST /artists', () => {
  test('returns 200 when artist post is correct', async () => {
    const artist = await createArtist();
    const result = await supertest(app)
      .post('/artists')
      .send({
        artist_name: artist.name,
        description: artist.description,
        photo: artist.photo,
      });
    expect(result.status).toEqual(200);
  });
});
