import Sequelize, { Model } from 'sequelize';
class Specialties extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        used: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        }
      },
      {
        sequelize,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsToMany(models.User, {
      through: 'userSpecialties',
      as: 'users',
      foreignKey: 'specialties_id',
    });
  }
}
export default Specialties;
