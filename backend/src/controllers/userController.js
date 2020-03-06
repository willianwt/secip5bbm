const bcryptjs = require('bcryptjs');
const User = require('../models/User');

module.exports = {

  async store(req, res) {
    const {
      rgm, password, email, name, grade, date,
    } = req.body;

    const createUser = await User.create({
      rgm, password, email, name, grade, date,
    });

    return res.json(createUser);
  },

  async index(req, res) { /* lista todos os protocolos */
    const users = await User.find();
    return res.json(users);
  },

  async update(req, res) { // atualiza um protocolo
    try {
      const {
        id, rgm, email, name, grade,
      } = req.body;

      if (typeof id !== 'string') return;

      const updateUser = await User.findByIdAndUpdate(id, {
        rgm, email, name, grade,
      }, { new: true }, (error, result) => {
        if (error) {
          console.log(error);
        }
        res.send(result);
      });
    } catch (error) {
      res.send(error);
    }
  },

  async login(req, res) {
    try {
      const { rgm, password } = req.body;

      const user = await User.findOne({ rgm }).select('+password');
      if (!user) { return res.status(400).send({ error: 'usuario nao encontrado' }); }

      const isValidPassword = await bcryptjs.compareSync(password, user.password);

      user.password = undefined; // esconde a hash de password do usuário

      if (!isValidPassword) {
        return res.send({ error: 'senha invalida' });
      }

      req.session.user = user;
      req.session.isLoggedIn = true;
      console.log(req.session);

      return req.session.save(() => res.send(req.session));
    } catch (error) {
      console.log(error);
      return res.status(404);
    }
  },

  async logout(req, res) {
    req.session.destroy();
    console.log(req.session);
    res.redirect('/');
  },
};
