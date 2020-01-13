import Sequelize, { Model } from 'sequelize';

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        cep: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.INTEGER,
      },
      sequelize
    );
    return this;
  }
}
