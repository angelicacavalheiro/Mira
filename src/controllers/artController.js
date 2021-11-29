/* eslint-disable import/prefer-default-export */
import * as service from '../services/artService.js';

async function getOneArt(req, res) {
  const { idArt } = req.params;
  try {
    const artDetails = await service.requestOneArt(idArt);
    res.send(artDetails);
  } catch (error) {
    res.send(error);
  }
}
export {
  getOneArt,
};
