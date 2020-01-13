import Sequelize, { Model } from 'sequelize';

class Clinic extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
      },
      sequelize
    );
    //roda apos qualquer clinica ser criado ou editado no banco
    this.addHook('beforeSave', async clinic => {
      if (clinic.password) {
        clinic.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'address_id', as: 'address' });
  }
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
