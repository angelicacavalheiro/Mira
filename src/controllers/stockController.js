/* eslint-disable consistent-return */
import * as service from '../services/stockService.js';

async function stockGet(req, res) {
  try {
    const stock = await service.requestGet();
    if (stock) {
      return res.status(200).send(stock);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function stockPost(req, res) {
  const {
    art_id,
    galery_id,
    price,
    quantity,
    art_photo,
  } = req.body;

  try {
    const insert = await service.requestPost({
      art_id,
      galery_id,
      price,
      quantity,
      art_photo,
    });
    if (insert) {
      return res.sendStatus(200);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
}

export {
  stockGet,
  stockPost,
};
