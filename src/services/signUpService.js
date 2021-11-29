/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcrypt';
import * as repository from '../repositories/signUpRepository.js';
import signUpSchema from '../schemas/signUpSchema.js';

async function checkData({
  email, password, username, adress,
}) {
  const isCorrectBody = signUpSchema.validate({
    email, password, username, adress,
  });

  if (isCorrectBody.error) {
    return (`${isCorrectBody.error.details[0].message}`);
  }
  const passwordHash = bcrypt.hashSync(password, 10);
  const emailExistence = await repository.verifyEmailAvailability({
    email, passwordHash, username, adress,
  });
  if (emailExistence) {
    return ('invalidEmail');
  }
  const postUser = await repository.insertUser({
    email, passwordHash, username, adress,
  });
  if (!postUser) {
    return null;
  }
  return ('registered');
}

export {
  checkData,
};
