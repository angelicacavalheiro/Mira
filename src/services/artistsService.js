/* eslint-disable import/prefer-default-export */
import * as repository from '../repositories/artistsRepository.js';

async function requisition() {
  const artists = await repository.getArtists();
  return artists;
}

async function requestInsert({
  artist_name,
  description,
  photo,
}) {
  const insert = await repository.insertArtists({
    artist_name,
    description,
    photo,
  });
  return insert;
}

export {
  requisition,
  requestInsert,
};
