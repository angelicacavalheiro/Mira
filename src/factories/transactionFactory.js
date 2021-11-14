import createStock from './stockFactory.js';
import connection from '../database/database.js';

export default async function createTransactions(userId) {
  const stock = await createStock();
  const stockId = Number(stock.id);
  const transaction = await connection.query(
    `
    INSERT INTO transactions (art_stock_id, carrier_quantity, user_id, status_id, upadate_status_date) VALUES (${stockId}, 1, ${userId}, 1, '2021/11/09') RETURNING *;
          `,
  );
  return transaction.rows[0];
}
