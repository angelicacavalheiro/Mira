import faker from 'faker';
import connection from '../database/database.js';

export default async function createStock() {
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
  const insertArt = await connection.query(`
          INSERT INTO arts (art_name, artist_id, art_category_id, size) VALUES ($1, $2, $3, $4) RETURNING *;
          `, [art.name, art.artist_id, art.art_category_id, art.size]);
  const artId = insertArt.rows[0].id;

  const gallery = {
    galery_name: faker.name.findName(),
    phone_number: faker.phone.phoneNumber(),
    description: faker.lorem.words(),
    adress: faker.address.streetAddress(),
  };
  const insertGallery = await connection.query(`
        INSERT INTO galeries (galery_name, phone_number, description, adress) VALUES ($1, $2, $3, $4) RETURNING *;
        `, [gallery.galery_name, gallery.phone_number, gallery.description, gallery.adress]);
  const galleryId = insertGallery.rows[0].id;

  const stock = {
    art_id: artId,
    galery_id: galleryId,
    price: faker.commerce.price(),
    quantity: faker.datatype.number(),
    update_date: faker.date.recent(),
    art_photo: faker.image.avatar(),
  };

  await connection.query(`
        INSERT INTO stock (art_id, galery_id, price, quantity, update_date, art_photo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
        `, [stock.art_id, stock.galery_id, stock.price, stock.quantity, stock.update_date, stock.art_photo]);
  return stock;
}
