import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';
import Specialties from "./Specialties";
class Clinic extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL
      },
      {
        sequelize,
      }
    );
    //roda apos qualquer clinica ser criado ou editado no banco
    this.addHook('beforeSave', async clinic => {
      if (clinic.password) {
        clinic.password_hash = await bcrypt.hash(clinic.password, 8);
      }
    });
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Address, { foreignKey: 'address_id', as: 'addresses' });
    this.belongsTo(models.File, { foreignKey: 'avatar_id',as: 'avatar' });

    this.hasMany(models.User);

    this.belongsTo(models.File, {
      foreignKey: 'avatar_id',
      as: 'avatar_clinic',
    });
    this.belongsToMany(models.Specialties, {
      through: 'queryValue',
      as: 'specialties',
      foreignKey: 'clinic_id',
    });
  }
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
export default Clinic;
