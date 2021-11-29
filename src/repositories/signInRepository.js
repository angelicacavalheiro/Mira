import connection from '../database/database.js';

async function getEmail(email) {
  const result = await connection.query(
    `
      SELECT * FROM users
      WHERE email = $1
    `,
    [email],
  );
  return result.rows[0];
}

async function createSession(token, userId) {
  const result = await connection.query(
    `
      INSERT INTO sessions ("user_id", token)
      VALUES ($1, $2)
    `,
    [userId, token],
  );
  return result.rowCount;
}

export {
  getEmail,
  createSession,
};
