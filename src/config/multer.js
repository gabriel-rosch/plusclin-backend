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

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
