//Router é responsavel pelo roteamento assim separando a parte de roteamento
//do resto do servidor
import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import ScheduleController from './app/controllers/ScheduleController';
import AppointmentController from './app/controllers/AppointmentController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';
import SpecialtiesController from './app/controllers/SpecialtiesController';
import ClinicController from './app/controllers/ClinicController';

import authMiddlewares from './app/middlewares/auth';
import multer from 'multer';
import multerConfig from './config/multer';
import MedicalRecordController from "./app/controllers/MedicalRecordController";


const routes = new Router();
const upload = multer(multerConfig);

routes.post('/user', UserController.store);

routes.get('/test', (req, res)=> {
    return res.send('Hello firebit from plusclin!');
});

routes.post('/sessions', SessionController.store);

routes.get('/specialties', SpecialtiesController.index);

routes.get('/specialties/:id', SpecialtiesController.indexId);

routes.get('/specialtiesName', SpecialtiesController.indexName);

routes.post('/medicalRecord', MedicalRecordController.store);
routes.get('/medicalRecord/:appointment_id', MedicalRecordController.index);

routes.post('/clinic', ClinicController.store);
routes.get('/clinic', ClinicController.index);

routes.get('/providers/:providerId/available', AvailableController.index);

routes.post('/files', upload.single('file'), FileController.store);
routes.get('/files/:id', FileController.index);
routes.post('/clinic/queryValue', ClinicController.storeQueryValue);

routes.get('/provider/:id/specialties', ProviderController.indexSpecialties);

routes.use(authMiddlewares);

routes.get('/user', UserController.indexSpecialties);

routes.get('/schedule', ScheduleController.index);

routes.delete('/schedule/:id', ScheduleController.delete);

routes.put('/user', UserController.update);

routes.get('/providers', ProviderController.index);

routes.post('/appointments', AppointmentController.store);

routes.get('/appointments', AppointmentController.index);

routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/notifications', NotificationController.index);

routes.put('/notifications/:id', NotificationController.update);

export default routes;
