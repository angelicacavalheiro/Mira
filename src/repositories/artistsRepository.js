/* eslint-disable import/prefer-default-export */
import connection from '../database/database.js';

async function getArtists() {
  const result = await connection.query('SELECT * FROM artists;');
  return result.rows;
}

async function insertArtists({
  artist_name,
  description,
  photo,
}) {
  const result = await connection.query(`
      INSERT INTO artists
      (artist_name, description, photo)
      VALUES ($1, $2, $3);
      `,
  [artist_name, description, photo]);
  return result.rowCount;
}

export {
  getArtists,
  insertArtists,
};
