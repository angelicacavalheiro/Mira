import connection from '../database/database.js';

async function postTransaction(req, res) {
  const {
    cart,
    cont,
    stockId,
    userToken,
  } = req.body;

  const date = new Date();

  const result = await connection.query(`
    SELECT user_id FROM sessions WHERE token = $1
    `, [userToken]);
  const { user_id } = result.rows[0];

  try {
    await connection.query(`
      INSERT INTO transactions (art_stock_id, carrier_quantity, user_id, status_id, upadate_status_date) VALUES ($1, $2, $3, $4, $5);
      `, [stockId, cont, user_id, cart, date]);

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
}

async function getTransaction(req, res) {
  try {
    const result = await connection.query(`
        SELECT * FROM transactions;
        `);
    return res.status(200).send(result.rows);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export {
  postTransaction,
  getTransaction,
};
