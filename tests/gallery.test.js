/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import createGallery from '../src/factories/galleryFactory.js';

beforeEach(async () => {
  await createGallery();
});

afterAll(() => {
  connection.end();
});

describe('GET /galeries', () => {
  it('returns 200 for valid gallery', async () => {
    const result = await supertest(app)
      .get('/galeries');

    expect(result.status).toEqual(200);
    expect(result.body[0]).toHaveProperty('id');
    expect(result.body[0]).toHaveProperty('galery_name');
    expect(result.body[0]).toHaveProperty('phone_number');
    expect(result.body[0]).toHaveProperty('description');
    expect(result.body[0]).toHaveProperty('adress');
  });
});

describe('POST /galeries', () => {
  test('returns 200 when arts post is correct', async () => {
    const gallery = await createGallery();
    const result = await supertest(app)
      .post('/galeries')
      .send({
        galery_name: gallery.galery_name,
        phone_number: gallery.phone_number,
        description: gallery.description,
        adress: gallery.adress,
      });
    expect(result.status).toEqual(200);
  });
});
