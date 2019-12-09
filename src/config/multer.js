import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  //Salvar arquivos no próprio projeto
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      // Gera randomByte de 16 caracteres
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);
        //call back paramter 1 == erro
        //transforma 16 numero em um hexadecimal
        //extname =(ex) .png
        // 2io23i323ui2u3.png
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
