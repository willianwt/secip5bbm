export default (req, res, next) => {
  if (!req.session.isLoggedIn) { // adicionar uma condição para niveis de acesso
    req.session.save(() => {
      res.send({ error: 'not logged' });
    });
    return;
  }
  next();
};


/*
CÓDIGO PARA MIDDLEWARE VIA TOKEN
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['login required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, rgm } = dados;
    req.userId = id;
    req.userRgm = rgm;
  } catch (error) {
    return res.status(401).json({
      errors: ['token expirado ou inválido'],
    });
  }
}; */
