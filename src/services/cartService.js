import * as repository from '../repositories/cartRepository.js';

async function requestUserId(token) {
  const result = await repository.getUser_id(token);
  if (result) {
    return result;
  }
  return null;
}

async function requestItens(userId) {
  const result = await repository.getItens(userId);
  return result;
}

export {
  requestUserId,
  requestItens,
};
