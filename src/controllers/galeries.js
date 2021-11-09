import connection from '../database/database.js';

async function galleryGet(req, res) {
  try {
    const result = await connection.query('SELECT * FROM galeries;');

    return res.status(200).send(result.rows);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function galleryPost(req, res) {
  const {
    galery_name,
    phone_number,
    description,
    adress,
  } = req.body;

  try {
    await connection.query(`
      INSERT INTO galeries (galery_name, phone_number, description, adress) VALUES ($1, $2, $3, $4);
      `, [galery_name, phone_number, description, adress]);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export {
  galleryGet,
  galleryPost,
};
