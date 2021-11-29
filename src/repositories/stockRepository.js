import connection from '../database/database.js';

async function getStock() {
  const result = await connection.query(`
  SELECT stock.*, arts.art_name
    FROM stock
  JOIN arts
  ON stock.art_id = arts.id
  `);
  return result.rows;
}

async function postStock({
  art_id,
  galery_id,
  price,
  quantity,
  art_photo,
  update_date,
}) {
  const result = await connection.query(`
  INSERT INTO stock
    (art_id, galery_id, price, quantity, update_date, art_photo)
  VALUES
    ($1, $2, $3, $4, $5, $6);
  `, [art_id, galery_id, price, quantity, update_date, art_photo]);
  return result.rowCount;
}

export {
  getStock,
  postStock,
};
