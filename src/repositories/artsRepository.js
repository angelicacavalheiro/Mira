import connection from '../database/database.js';

async function insertArt({
  art_name,
  artist_id,
  art_category_id,
  size,
}) {
  const result = await connection.query(`
    INSERT INTO arts (art_name, artist_id, art_category_id, size) VALUES ($1, $2, $3, $4);
    `, [art_name, artist_id, art_category_id, size]);
  return result.rowCount;
}

async function getArts() {
  const result = await connection.query('SELECT * FROM arts;');
  return result.rows;
}

export {
  insertArt,
  getArts,
};
