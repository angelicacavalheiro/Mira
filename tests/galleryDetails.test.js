/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import galleryIdFactory from '../src/factories/galleryDetailsFactory.js';

afterAll(() => {
  connection.end();
});

describe('GET /gallery/:idGallery', () => {
  it('returns 200 for valid gallery_id', async () => {
    const gallery_id = await galleryIdFactory();

    const result = await supertest(app)

      .get(`/gallery/${gallery_id}`);

    console.log(result.body[0]);
    const { status } = result;

    expect(status).toEqual(200);
    expect(result.body[0]).toHaveProperty('idStock');
    expect(result.body[0]).toHaveProperty('quantity');
    expect(result.body[0]).toHaveProperty('price');
    expect(result.body[0]).toHaveProperty('art_photo');
    expect(result.body[0]).toHaveProperty('id');
    expect(result.body[0]).toHaveProperty('galery_name');
    expect(result.body[0]).toHaveProperty('phone_number');
    expect(result.body[0]).toHaveProperty('description');
    expect(result.body[0]).toHaveProperty('adress');
    expect(result.body[0]).toHaveProperty('art_name');
    expect(result.body[0]).toHaveProperty('artist_name');
    expect(result.body[0]).toHaveProperty('artistDescription');
    expect(result.body[0]).toHaveProperty('artistPhoto');
  });
});

// expect(result.body[0]).toHaveProperty('idStock');
// expect(result.body[0]).toHaveProperty('quantity');
// expect(result.body[0]).toHaveProperty('price');
// expect(result.body[0]).toHaveProperty('art_photo');
// expect(result.body[0]).toHaveProperty('id');
// expect(result.body[0]).toHaveProperty('galery_name');
// expect(result.body[0]).toHaveProperty('phone_number');
// expect(result.body[0]).toHaveProperty('description');
// expect(result.body[0]).toHaveProperty('adress');
// expect(result.body[0]).toHaveProperty('art_name');
// expect(result.body[0]).toHaveProperty('artist_name');
// expect(result.body[0]).toHaveProperty('artistDescription');
// expect(result.body[0]).toHaveProperty('artistPhoto');
