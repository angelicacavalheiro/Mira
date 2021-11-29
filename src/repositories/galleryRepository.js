/* eslint-disable import/prefer-default-export */
import connection from '../database/database.js';

async function getOneGallery(idGallery) {
  const result = await connection.query(
    `
        SELECT stock.id as "idStock", stock.quantity, stock.price as "price", stock.art_photo,
         galeries.*, arts.art_name,
         artists.artist_name, artists.description as "artistDescription", artists.photo as "artistPhoto"
        FROM stock
          JOIN galeries ON stock.galery_id = galeries.id
          JOIN arts ON stock.art_id = arts.id
          JOIN artists ON arts.artist_id = artists.id
        WHERE galeries.id = $1;
      `,
    [idGallery],
  );
  return result.rows;
}

export {
  getOneGallery,
};
