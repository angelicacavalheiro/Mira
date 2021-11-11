import connection from '../database/database.js';

async function getOneGallery(req, res) {
  const { idGallery } = req.params;
  try {
    const result = await connection.query(
      `
        SELECT * FROM galeries
        WHERE id = $1
    `,
      [idGallery],
    );
    res.send(result.rows[0]);
  } catch (error) {
    res.sendStatus(500);
  }
}

export default getOneGallery;
