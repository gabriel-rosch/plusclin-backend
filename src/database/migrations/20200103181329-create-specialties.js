'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('specialties', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      key: {
        type: Sequelize.STRING,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('specialties');
  },
};
