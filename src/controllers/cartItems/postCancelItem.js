import connection from '../../database/database.js';

async function postCancelItem(req, res) {
  const authorization = req.headers.authorization;
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
    const { id } = req.body;

    await connection.query(
      `
        UPDATE transactions SET status_id = 3 WHERE user_id = $1 AND id = $2;
    `,
      [userId, id],
    );

    return res.send(200);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export default postCancelItem;
