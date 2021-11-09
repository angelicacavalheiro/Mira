import connection from '../database/database.js';

async function artsGet(req, res) {
  try {
    const result = await connection.query('SELECT * FROM arts;');

    return res.status(200).send(result.rows);
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function artsPost(req, res) {
  const {
    art_name,
    artist_id,
    art_category_id,
    size,
  } = req.body;

  try {
    await connection.query(`
      INSERT INTO arts (art_name, artist_id, art_category_id, size) VALUES ($1, $2, $3, $4);
      `, [art_name, artist_id, art_category_id, size]);

    res.sendStatus(200);
  } catch (error) {
      console.log(error)
    res.sendStatus(500);
  }
}

export {
  artsGet,
  artsPost,
};
