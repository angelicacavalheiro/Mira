/* eslint-disable import/prefer-default-export */
import * as service from '../services/galleryService.js';

async function getOneGallery(req, res) {
  const { idGallery } = req.params;
  try {
    const galleryDetails = await service.requestOneGallery(idGallery);
    res.send(galleryDetails);
  } catch (error) {
    res.sendStatus(500);
  }
}

export {
  getOneGallery,
};
