//Router é responsavel pelo roteamento assim separando a parte de roteamento
//do resto do servidor
import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import ScheduleController from './app/controllers/ScheduleController';

import authMiddlewares from './app/middlewares/auth';
import multer from 'multer';
import multerConfig from './config/multer';
import AppointmentController from './app/controllers/AppointmentController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/user', UserController.store);
routes.post('/sessions', SessionController.store);

//Middlewares
routes.use(authMiddlewares);

routes.get('/schedule', ScheduleController.index);
routes.put('/user', UserController.update);
//upload.single(nomeArquivoEnviadoNaRequisição)
//upload.single liberar req.file dentro do req
routes.post('/files', upload.single('file'), FileController.store);

routes.get('/providers', ProviderController.index);

routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);

export default routes;
