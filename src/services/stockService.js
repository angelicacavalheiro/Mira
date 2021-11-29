import * as repository from '../repositories/stockRepository.js';

async function requestGet() {
  const result = await repository.getStock();
  return result;
}

async function requestPost({
  art_id,
  galery_id,
  price,
  quantity,
  art_photo,
}) {
  const update_date = new Date();
  const result = await repository.postStock({
    art_id,
    galery_id,
    price,
    quantity,
    art_photo,
    update_date,
  });
  return result;
}

export {
  requestGet,
  requestPost,
};
