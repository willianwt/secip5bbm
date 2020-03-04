/* eslint-disable import/first */
require('dotenv').config();

import express from 'express';
import cors from 'cors';
import homeRoutes from './src/routes/homeRoutes';
import protocolRoutes from './src/routes/protocolRoutes';
import userRoutes from './src/routes/userRoutes';
import tokenRoutes from './src/routes/tokenRoutes';

const app = express();

const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,

  })
  .then(() => {
    app.emit('pronto');
  })
  .catch((e) => console.log(e));

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }


  middlewares() {
    /* alterar para liberar acesso somente do endereço da aplicação { origin: adress} */
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }


  routes() {
    this.app.use('/', homeRoutes);

    this.app.use('/protocol', protocolRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/tokens', tokenRoutes);
  }
}

export default new App().app;
