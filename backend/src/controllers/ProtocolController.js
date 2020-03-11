const Protocol = require('../models/Protocol');

module.exports = {

  async store(req, res) { /* cadastra um protocolo */
    const {
      protocol, area, type, district, situation, date, status, division, tax, observations, user, fiscal, inspection,
    } = req.body;

    console.log(req.body);
    const createProtocol = await Protocol.create({
      protocol, area, type, district, situation, date, status, division, tax, observations, user, fiscal, inspection,
    });

    return res.json(createProtocol);
  },

  async index(req, res) { /* lista todos os protocolos */
    const protocols = await Protocol.find();
    return res.send(protocols);
  },

  async update(req, res) { // atualiza um protocolo

  },
};
