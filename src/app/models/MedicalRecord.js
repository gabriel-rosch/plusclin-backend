import Sequelize, { Model } from 'sequelize';
class MedicalRecord extends Model {
    static init(sequelize) {
        super.init(
            {
                text: Sequelize.STRING,
            },
            {
                sequelize
            }

        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Appointment, { foreignKey: 'appointment_id', as: 'appointment' });
    }

}


export default MedicalRecord;