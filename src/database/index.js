import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Specialties from '../app/models/Specialties';
import Appointment from '../app/models/Appointment';
import Clinic from '../app/models/Clinic';
import Address from '../app/models/Address';

import databaseConfig from '../config/database';

import SpecialtiesController from '../app/controllers/SpecialtiesController';

const models = [User, File, Appointment, Specialties, Clinic, Address];

class DataBase {
  constructor() {
    this.init();
    this.mongo();
    //this.dataInit();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));

    //
  }
  mongo() {
    this.mongoConnection = async () =>
      await mongoose.connect(
        'mongodb+srv://plusclin:masterkey@cluster0-vvzlf.mongodb.net/test?retryWrites=true&w=majority',
        {
          useNewUrlParser: true,

          useUnifiedTopology: true,
        }
      );
  }
  dataInit() {
    SpecialtiesController.initDatabase();
  }
}
export default new DataBase();
