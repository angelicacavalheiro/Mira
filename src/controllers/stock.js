import connection from '../database/database.js';

async function stockGet(req, res) {
  try {
    const result = await connection.query(`
    SELECT stock.*, arts.art_name
      FROM stock JOIN arts ON stock.art_id = arts.id
  `);

    return res.status(200).send(result.rows);
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function stockPost(req, res) {
  const update_date = new Date();
  const {
    art_id,
    galery_id,
    price,
    quantity,
    art_photo,
  } = req.body;

  try {
    await connection.query(`
      INSERT INTO stock (art_id, galery_id, price, quantity, update_date, art_photo) VALUES ($1, $2, $3, $4, $5, $6);
      `, [art_id, galery_id, price, quantity, update_date, art_photo]);

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
}

export {
  stockGet,
  stockPost,
};
