import connection from '../database/database.js';

async function galleryGet(req, res) {
  const query = `
    SELECT * 
      FROM galeries
    WHERE galery_name = $1;
  `;

  try {
    const result = await connection.query(query, [req.query.galery_name]);

    return res.status(200).send(result.rows);
  } catch (error) {
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
    res.sendStatus(500);
  }
}

export {
  galleryGet,
  galleryPost,
};
