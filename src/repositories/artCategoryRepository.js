import connection from '../database/database.js';

async function getArtCategory() {
  const result = await connection.query('SELECT * FROM art_category');
  return result.rows;
}

async function postArtCategory(category_name) {
  const result = await connection.query(`
  INSERT INTO art_category (category_name) VALUES ($1);
  `, [category_name]);
  return result.rowCount;
}

export {
  getArtCategory,
  postArtCategory,
};
