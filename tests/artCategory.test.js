/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import createArtsCategory from '../src/factories/artCategoryFactory.js';

beforeEach(async () => {
  await createArtsCategory();
});

afterAll(() => {
  connection.end();
});

describe('GET /artCategory', () => {
  it('returns 200 for valid artCategory', async () => {
    const result = await supertest(app)
      .get('/artCategory');

    expect(result.status).toEqual(200);
    expect(result.body[0]).toHaveProperty('id');
    expect(result.body[0]).toHaveProperty('category_name');
  });
});

describe('POST /artCategory', () => {
  test('returns 200 when artist art category is correct', async () => {
    const category = await createArtsCategory();
    const result = await supertest(app)
      .post('/artCategory')
      .send({ category_name: category.name });
    expect(result.status).toEqual(200);
  });
});
