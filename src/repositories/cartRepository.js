import connection from '../database/database.js';

async function getUser_id(token) {
  const result = await connection.query(
    `
      SELECT * FROM sessions WHERE token = $1;
      `,
    [token],
  );
  if (result.rowCount === 0) {
    return null;
  }
  return result.rows[0].user_id;
}

async function getItens(userId) {
  const result = await connection.query(
    `
     SELECT transactions.carrier_quantity, transactions.id, arts.art_name, artists.artist_name, stock.price, stock.art_photo
     FROM transactions JOIN stock ON transactions.art_stock_id = stock.id
     JOIN arts ON stock.art_id = arts.id
     JOIN artists ON arts.artist_id = artists.id
     WHERE user_id = $1 AND status_id = 1;
  `,
    [userId],
  );
  return result.rows;
}

export {
  getUser_id,
  getItens,
};
