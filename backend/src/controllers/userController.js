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
    const protocols = await User.find();
    return res.json(protocols);
  },
};
