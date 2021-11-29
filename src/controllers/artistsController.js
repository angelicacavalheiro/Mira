/* eslint-disable consistent-return */
import * as service from '../services/artistsService.js';

async function artistsGet(req, res) {
  try {
    const artists = await service.requisition();
    return res.status(200).send(artists);
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function artistsPost(req, res) {
  const {
    artist_name,
    description,
    photo,
  } = req.body;

  try {
    const insert = await service.requestInsert({
      artist_name,
      description,
      photo,
    });
    if (insert) {
      return res.sendStatus(200);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
}

export {
  artistsGet,
  artistsPost,
};
