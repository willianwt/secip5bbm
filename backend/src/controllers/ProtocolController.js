const Protocol = require('../models/Protocol');

module.exports = {

  async store(req, res) {
    const {
      protocol, area, type, district, situation, date, status, division, tax, observations,
    } = req.body;

    console.log(req.body);
    const createProtocol = await Protocol.create({
      protocol, area, type, district, situation, date, status, division, tax, observations,
    });

    return res.json(createProtocol);
  },
};
