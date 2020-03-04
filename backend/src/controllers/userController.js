const bcryptjs = require('bcryptjs');
const User = require('../models/User');

module.exports = {

  async store(req, res) {
    const {
      rgm, password, email, name, grade, date,
    } = req.body;

    console.log(req.body);
    const createUser = await User.create({
      rgm, password, email, name, grade, date,
    });

    return res.json(createUser);
  },

  async index(req, res) { /* lista todos os protocolos */
    const users = await User.find();
    return res.json(users);
  },

  async login(req, res) {
    const { rgm, password } = req.body;

    const user = await User.findOne({ rgm }).select('+password');
    if (!user) { return res.status(400).send({ error: 'usuario nao encontrado' }); }

    if (password !== user.password) { return res.send({ error: 'senha invalida' }); }

    req.session.user = user.rgm;
    req.session.save(() => res.redirect('back'));

    return res.send(req.session);
  },
};
