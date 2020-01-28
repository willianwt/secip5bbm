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
};
