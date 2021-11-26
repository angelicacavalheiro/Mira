/* eslint-disable import/prefer-default-export */
import * as service from '../../services/cartService.js';

async function getCartItems(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) return res.sendStatus(401);
  try {
    const userId = await service.requestUserId(token);
    if (userId) {
      const itens = await service.requestItens(userId);
      if (itens) {
        return res.status(200).send(itens);
      }
    }
    return res.status(401).send('You are not logged in');
  } catch (error) {
    return res.sendStatus(500);
  }
}

export {
  getCartItems,
};
