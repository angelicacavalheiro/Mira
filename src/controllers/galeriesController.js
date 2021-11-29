/* eslint-disable consistent-return */
import * as service from '../services/galeriesService.js';

async function galleryGet(req, res) {
  const { query } = req;
  try {
    const result = await service.searchForGaleries({ query });
    return res.status(200).send(result);
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function galleryPost(req, res) {
  const {
    galery_name,
    phone_number,
    description,
    adress,
  } = req.body;

  try {
    const result = await service.requestInsert({
      galery_name,
      phone_number,
      description,
      adress,
    });
    if (result) {
      return res.sendStatus(200);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
}

export {
  galleryGet,
  galleryPost,
};
