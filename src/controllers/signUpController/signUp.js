/* eslint-disable import/prefer-default-export */
import * as service from '../../services/signUpService.js';

async function singUp(req, res) {
  const {
    email, password, username, adress,
  } = req.body;

  try {
    const userError = await service.checkData({
      email,
      password,
      username,
      adress,
    });

    if (userError !== 'registered' || userError !== 'invalidEmail') {
      return res.status(400).send(userError);
    } if (userError === 'invalidEmail') {
      return res.sendStatus(403);
    }
    return res.sendStatus(200);
  } catch (erro) {
    return res.sendStatus(500);
  }
}

export {
  singUp,
};
