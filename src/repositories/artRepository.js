/* eslint-disable import/prefer-default-export */
import connection from '../database/database.js';

async function getOneArt(idArt) {
  const result = await connection.query(
    `
        SELECT arts.*, artists.artist_name, artists.description, galeries.galery_name, stock.* FROM stock JOIN galeries ON stock.galery_id = galeries.id
        JOIN arts ON stock.art_id = arts.id
        JOIN artists ON arts.artist_id = artists.id
        WHERE stock.id = $1;
      `,
    [idArt],
  );
  return result.rows;
}

export {
  getOneArt,
};
