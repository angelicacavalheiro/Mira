/* eslint-disable consistent-return */
import * as service from '../services/artCategoryService.js';

async function artCategoryGet(req, res) {
  try {
    const artCategory = await service.requestGet();
    if (artCategory) {
      return res.status(200).send(artCategory);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function artCategoryPost(req, res) {
  const {
    category_name,
  } = req.body;

  try {
    const insert = await service.requestPost(category_name);
    if (insert) {
      return res.sendStatus(200);
    }
  } catch (error) {
    res.sendStatus(500);
  }
}

export {
  artCategoryGet,
  artCategoryPost,
};
