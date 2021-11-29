/* eslint-disable import/prefer-default-export */
import * as repository from '../repositories/artRepository.js';

async function requestOneArt(idArt) {
  const result = await repository.getOneArt(idArt);
  return result;
}

export {
  requestOneArt,
};
