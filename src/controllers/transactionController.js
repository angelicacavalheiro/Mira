/* eslint-disable consistent-return */
import * as service from '../services/transactionService.js';

async function getTransaction(req, res) {
  try {
    const transactions = await service.requestGet();
    if (transactions) {
      return res.status(200).send(transactions);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function postTransaction(req, res) {
  const {
    cart,
    cont,
    stockId,
    userToken,
  } = req.body;

  try {
    const userId = await service.requestUserId(userToken);
    if (userId) {
      const transaction = await service.requestPostTransaction({
        cart,
        cont,
        stockId,
        userId,
      });
      if (transaction) {
        return res.sendStatus(200);
      }
    }
  } catch (error) {
    res.sendStatus(500);
  }
}

export {
  postTransaction,
  getTransaction,
};
