import faker from 'faker';
import connection from '../database/database.js';

export default async function createArtist() {
  const artist = {
    name: faker.name.findName(),
    description: faker.lorem.words(),
    photo: faker.image.avatar(),
  };
  await connection.query(`
        INSERT INTO artists (artist_name, description, photo) VALUES ($1, $2, $3) RETURNING *;
        `, [artist.name, artist.description, artist.photo]);

  return artist;
}
