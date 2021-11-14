import connection from '../database/database.js';

export default async function getOneArt(req, res) {
  const { idArt } = req.params;
  try {
    const result = await connection.query(
      `
      SELECT arts.*, artists.artist_name, artists.description, galeries.galery_name, stock.* FROM stock JOIN galeries ON stock.galery_id = galeries.id 
      JOIN arts ON stock.art_id = arts.id
      JOIN artists ON arts.artist_id = artists.id
      WHERE stock.id = $1;
    `,
      [idArt],
    );
    res.send(result.rows);
  } catch (error) {
    res.send(error);
  }
}
