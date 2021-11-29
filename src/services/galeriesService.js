import * as repository from '../repositories/galeriesRepository.js';

async function searchForGaleries({ query }) {
  if (query.galery_name === undefined) {
    const result = await repository.getAllGaleries();
    return result;
  }
  const result = await repository.getOneGalerie({ query });
  return result;
}

async function requestInsert({
  galery_name,
  phone_number,
  description,
  adress,
}) {
  const result = await repository.insertGallery({
    galery_name,
    phone_number,
    description,
    adress,
  });
  return result;
}

export {
  searchForGaleries,
  requestInsert,
};
