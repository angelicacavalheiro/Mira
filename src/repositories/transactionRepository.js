import connection from '../database/database.js';

async function getTransactions() {
  const result = await connection.query(`
  SELECT * FROM transactions;
  `);
  return result.rows;
}

async function getUserId(userToken) {
  const result = await connection.query(`
    SELECT user_id FROM sessions WHERE token = $1
    `, [userToken]);
  return result.rows[0].user_id;
}

async function postUserTransaction({
  cart,
  cont,
  stockId,
  userId,
  date,
}) {
  const result = await connection.query(`
  INSERT INTO transactions
    (art_stock_id, carrier_quantity, user_id, status_id, upadate_status_date)
  VALUES
    ($1, $2, $3, $4, $5);
  `, [stockId, cont, userId, cart, date]);
  return result.rowCount;
}

export {
  getTransactions,
  getUserId,
  postUserTransaction,
};
