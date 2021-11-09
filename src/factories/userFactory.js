import bcrypt from 'bcrypt';
import faker from 'faker';
import connection from '../database/database.js';

async function createUser() {
  const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: '123456',
    hashedPassword: bcrypt.hashSync('123456', 10),
    adress: faker.address.streetName,
  };

  const insertedUser = await connection.query(
    `INSERT INTO users (name, email, password, adress) VALUES ($1, $2, $3, $4) RETURNING *`,
    [user.name, user.email, user.hashedPassword, user.adress]
  );

  user.id = insertedUser.rows[0].id;

  return user;
}

async function eraseUserAndSessionsTable() {
  await connection.query(`DELETE FROM sessions;DELETE FROM users;`);
}

export { createUser, eraseUserAndSessionsTable };
