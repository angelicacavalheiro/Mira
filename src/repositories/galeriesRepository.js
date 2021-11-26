import connection from '../database/database.js';

async function getAllGaleries() {
  const result = await connection.query('SELECT * FROM galeries');
  return result.rows;
}

async function getOneGalerie({ query }) {
  const Query = `
      SELECT *
        FROM galeries
      WHERE galery_name ILIKE $1;
    `;
  const result = await connection.query(Query, [`%${query.galery_name}%`]);
  return result.rows;
}

async function insertGallery({
  galery_name,
  phone_number,
  description,
  adress,
}) {
  const result = await connection.query(`
    INSERT INTO galeries (galery_name, phone_number, description, adress) VALUES ($1, $2, $3, $4);
    `, [galery_name, phone_number, description, adress]);
  return result.rowCount;
}

export {
  getAllGaleries,
  getOneGalerie,
  insertGallery,
};
