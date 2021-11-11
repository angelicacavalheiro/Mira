import faker from 'faker';
import connection from '../database/database.js';

export default async function createGallery() {
  const gallery = {
    galery_name: faker.name.findName(),
    phone_number: faker.phone.phoneNumber(),
    description: faker.lorem.words(),
    adress: faker.address.streetAddress(),
  };

  await connection.query(`
        INSERT INTO galeries (galery_name, phone_number, description, adress) VALUES ($1, $2, $3, $4) RETURNING *;
        `, [gallery.galery_name, gallery.phone_number, gallery.description, gallery.adress]);

  return gallery;
}
