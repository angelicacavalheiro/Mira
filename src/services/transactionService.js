import * as repository from '../repositories/transactionRepository.js';

async function requestGet() {
  const result = await repository.getTransactions();
  return result;
}

async function requestUserId(userToken) {
  const userId = await repository.getUserId(userToken);
  return userId;
}

async function requestPostTransaction({
  cart,
  cont,
  stockId,
  userId,
}) {
  const date = new Date();
  const transaction = await repository.postUserTransaction({
    cart,
    cont,
    stockId,
    userId,
    date,
  });
  return transaction;
}

export {
  requestGet,
  requestUserId,
  requestPostTransaction,
};
