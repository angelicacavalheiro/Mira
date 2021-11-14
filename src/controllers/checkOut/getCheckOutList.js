import connection from '../../database/database.js';

async function getCheckoutList(req, res) {
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
    checkoutList.forEach(async (item) => {
      const transactionId = item.id;
      const idArt = item.art_stock_id;
      const newStockQuantity = Number(item.quantity) - Number(item.carrier_quantity);
      await connection.query(`
                UPDATE stock SET quantity = ${newStockQuantity} WHERE id = ${Number(idArt)};
            `);
      await connection.query(
        `UPDATE transactions SET status_id = 2 WHERE id = ${transactionId};`,
      );
    });

    return res.send(checkoutList);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export default getCheckoutList;
