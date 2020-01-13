//Aqui que configuramos o servidor express
import express from 'express';
import routes from './routes';
import path from 'path';

import './database';
class App {
  constructor() {
    this.server = express();
    //Chamar para que rode os metodos ao chamar a class App
    this.middlawares();
    this.routes();
  }

  middlawares() {
    this.server.use(express.json());
    //Local onde arquivos staticos serão guardados
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }
  routes() {
    //Chamar a clase de rotas
    this.server.use(routes);
  }
}

export default new App().server;
