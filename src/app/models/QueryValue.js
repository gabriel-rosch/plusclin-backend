import Sequelize, { Model } from 'sequelize';
class QueryValue extends Model {
    static init(sequelize) {
        super.init(
            {
                value: Sequelize.INTEGER,
            },
            {
                sequelize,
                tableName: "queryValue"
            }

        );

        return this;
    }
}

export default QueryValue;