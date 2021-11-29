/* eslint-disable import/prefer-default-export */
import * as repository from '../repositories/galleryRepository.js';

async function requestOneGallery(idGallery) {
  const result = await repository.getOneGallery(idGallery);
  return result;
}

export {
  requestOneGallery,
};
