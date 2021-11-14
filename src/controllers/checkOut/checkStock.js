import connection from '../../database/database.js';

export default async function checkStock(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) return res.sendStatus(401);
  try {
    const findToken = await connection.query(
      `
        SELECT * FROM sessions WHERE token = $1;
        `,
      [token],
    );

    if (findToken.rowCount === 0) {
      return res.status(401).send('You are not logged in');
    }

    const userId = findToken.rows[0].user_id;

    const result = await connection.query(
      `
       SELECT transactions.carrier_quantity, transactions.id, transactions.art_stock_id, arts.art_name, artists.artist_name, stock.price, stock.quantity, stock.art_photo
       FROM transactions JOIN stock ON transactions.art_stock_id = stock.id
       JOIN arts ON stock.art_id = arts.id
       JOIN artists ON arts.artist_id = artists.id
       WHERE user_id = $1 AND status_id = 1;
    `,
      [userId],
    );

    const checkoutList = result.rows;
    const outOfStock = checkoutList.filter(
      (item) => item.carrier_quantity > item.quantity,
    );
    if (outOfStock.length > 0) {
      return res.status(405).send(outOfStock);
    }
    return res.status(200);
  } catch (error) {
    return res.sendStatus(500);
  }
}
