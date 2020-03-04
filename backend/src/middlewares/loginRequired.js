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
};
