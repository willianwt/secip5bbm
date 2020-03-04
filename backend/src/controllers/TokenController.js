import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    const { rgm = '', password = '' } = req.body;

    if (!rgm || !password) {
      return res.status(401).json({
        errors: ['Credenciais Inválidas'],
      });
    }
    const user = await User.findOne({ rgm });
    if (!user) {
      return res.status(401).json({
        errors: ['Usuário Inexistente'],
      });
    }
    const isValidPassword = await bcryptjs.compareSync(password, user.password);
    console.log(await isValidPassword);

    if (await !isValidPassword) {
      return res.status(401).json({
        errors: ['senha inválida'],
      });
    }
    const { id } = user;
    const token = jwt.sign({ id, rgm }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res.json({ token });
  }
}


export default new TokenController();
