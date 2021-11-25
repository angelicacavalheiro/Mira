/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import * as repository from '../repositories/signInRepository.js';

async function userAuthenticate({ email, password }) {
  const user = await repository.getEmail(email);
  if (!user) {
    return null;
  }
  if (user && bcrypt.compareSync(password, user.password)) {
    // sucesso, usuário encontrado com este email e senha!
    const token = uuid();
    await repository.createSession(token, user.id);
    return ({ user, token });
  }
  return null;
}

export {
  userAuthenticate,
};
