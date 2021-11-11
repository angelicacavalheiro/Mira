import connection from '../database/database.js';

async function artistsGet(req, res) {
  try {
    const result = await connection.query('SELECT * FROM artists;');

    return res.status(200).send(result.rows);
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function artistsPost(req, res) {
  const {
    artist_name,
    description,
    photo,
  } = req.body;

  try {
    await connection.query(`
      INSERT INTO artists (artist_name, description, photo) VALUES ($1, $2, $3);
      `, [artist_name, description, photo]);

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
}

export {
  artistsGet,
  artistsPost,
};
