/* eslint-disable consistent-return */
import * as service from '../services/artsService.js';

async function artsGet(req, res) {
  try {
    const arts = await service.requestArts();
    if (arts) {
      return res.status(200).send(arts);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function artsPost(req, res) {
  const {
    art_name,
    artist_id,
    art_category_id,
    size,
  } = req.body;

  try {
    const insertArt = await service.requestInsert({
      art_name,
      artist_id,
      art_category_id,
      size,
    });
    if (insertArt) {
      return res.sendStatus(200);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
}

export {
  artsGet,
  artsPost,
};
