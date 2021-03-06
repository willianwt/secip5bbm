const Protocol = require('../models/Protocol');

module.exports = {

  async store(req, res) { /* cadastra um protocolo */
    const {
      protocol, area, type, district, situation, date, division, tax, observations, user, fiscal, inspection,
    } = req.body;

    // checa se o protocolo já existe
    const protocolExists = await Protocol.find({ protocol }, (err) => {
      if (err) {
        res.send('erro');
      }
    });

    // retorna erro caso o protocolo exista
    if (protocolExists.length > 0) {
      res.send('protocol exists');
      return;
    }

    console.log(protocolExists);

    console.log(req.body);
    const createProtocol = await Protocol.create({
      protocol, area, type, district, situation, date, division, tax, observations, user, fiscal, inspection,
    });

    return res.json(createProtocol);
  },

  async index(req, res) { /* lista todos os protocolos */
    const protocols = await Protocol.find()
      .populate('user')
      .populate({
        path: 'changes.user',
        model: 'User',
      });
    return res.send(protocols);
  },

  async delete(req, res) { /* deleta um protocolo */
    const { id } = req.params;
    try {
      await Protocol.findByIdAndRemove(id, (err, result) => {
        if (!result) {
          res.send('nao encontrado');
        } else if (err) {
          res.send('erro');
        } else {
          res.send('ok');
        }
      });
    } catch (e) {
      console.log(e);
      res.send({ erro: 'erro', e });
    }
  },

  async update(req, res) { // atualiza um protocolo
    const {
      id,
      protocol,
      area,
      type,
      district,
      situation,
      date,
      division,
      tax,
      observations,
      user,
      fiscal,
      inspection,
      modification,
    } = req.body;

    const updateProtocol = await Protocol.findByIdAndUpdate(id, {
      protocol,
      area,
      type,
      district,
      situation,
      date,
      division,
      tax,
      observations,
      fiscal,
      inspection,
      $push: {
        changes: [{
          user,
          modification,
        }],
      },
    }, { new: true });

    console.log(req.body);
    res.send(updateProtocol);

    return 'ok';
  },
};
