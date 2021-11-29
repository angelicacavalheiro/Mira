/* eslint-disable import/prefer-default-export */
import connection from '../database/database.js';

async function verifyEmailAvailability({ email }) {
  const existEmail = await connection.query(
    `
      SELECT * FROM users
      WHERE email = $1
  `,
    [email],
  );
  return (existEmail.rowCount);
}

async function insertUser({
  email, passwordHash, username, adress,
}) {
  const insert = await connection.query(
    `
      INSERT INTO users
      (name, email, password, adress)
      VALUES ($1, $2, $3, $4)
    `,
    [username, email, passwordHash, adress],
  );
  return (insert.rowCount);
}

export {
  verifyEmailAvailability,
  insertUser,
};
