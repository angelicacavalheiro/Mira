import * as service from '../../services/signInService.js';

export default async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const authenticate = await service.userAuthenticate({ email, password });
    if (authenticate) {
      return (
        res.send({
          name: authenticate.user.name,
          token: authenticate.token,
          email: authenticate.user.email,
          adress: authenticate.user.adress,
        }));
    }
    // usuário não encontrado (email ou senha incorretos)
    return res.sendStatus(403);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export {
  signIn,
};
