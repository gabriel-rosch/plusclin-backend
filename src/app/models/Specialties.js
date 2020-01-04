import Sequelize, { Model } from 'sequelize';
class Specialties extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}
export default Specialties;
