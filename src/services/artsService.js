import * as repository from '../repositories/artsRepository.js';

async function requestArts() {
  const result = await repository.getArts();
  return result;
}

async function requestInsert({
  art_name,
  artist_id,
  art_category_id,
  size,
}) {
  const result = await repository.insertArt({
    art_name,
    artist_id,
    art_category_id,
    size,
  });
  return result;
}

export {
  requestArts,
  requestInsert,
};
