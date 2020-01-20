import Sequelize, { Model } from 'sequelize';
class Specialties extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        used: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }
}
export default Specialties;
