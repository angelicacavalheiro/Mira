import connection from '../database/database.js';

async function artCategoryGet(req, res) {
  try {
    const result = await connection.query('SELECT * FROM art_category;');

    return res.status(200).send(result.rows);
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function artCategoryPost(req, res) {
  const {
    category_name,
  } = req.body;

  try {
    await connection.query(`
      INSERT INTO art_category (category_name) VALUES ($1);
      `, [category_name]);

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
}

export {
  artCategoryGet,
  artCategoryPost,
};
