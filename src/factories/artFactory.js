import faker from 'faker';
import connection from '../database/database.js';

export default async function createArts() {
  const artist = {
    name: faker.name.findName(),
    description: faker.lorem.words(),
    photo: faker.image.avatar(),
  };
  const insertArtist = await connection.query(`
        INSERT INTO artists (artist_name, description, photo) VALUES ($1, $2, $3) RETURNING *;
        `, [artist.name, artist.description, artist.photo]);

  const artistId = insertArtist.rows[0].id;

  const category = {
    name: faker.lorem.word(),
  };
  const insertArtCategory = await connection.query(`
        INSERT INTO art_category (category_name) VALUES ($1) RETURNING *;
        `, [category.name]);

  const categoryId = insertArtCategory.rows[0].id;

  const art = {
    name: faker.lorem.word(),
    artist_id: artistId,
    art_category_id: categoryId,
    size: faker.datatype.number(),
  };
  await connection.query(`
          INSERT INTO arts (art_name, artist_id, art_category_id, size) VALUES ($1, $2, $3, $4) RETURNING *;
          `, [art.name, art.artist_id, art.art_category_id, art.size]);
  return art;
}
