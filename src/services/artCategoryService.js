import * as repository from '../repositories/artCategoryRepository.js';

async function requestGet() {
  const result = await repository.getArtCategory();
  return result;
}

async function requestPost(category_name) {
  const result = await repository.postArtCategory(category_name);
  return result;
}

export {
  requestGet,
  requestPost,
};
