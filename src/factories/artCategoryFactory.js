import faker from 'faker';
import connection from '../database/database.js';

export default async function createArtsCategory() {
  const category = {
    name: faker.lorem.word(),
  };
  await connection.query(`
        INSERT INTO art_category (category_name) VALUES ($1) RETURNING *;
        `, [category.name]);

  return category;
}
