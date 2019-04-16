'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('opinions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      content: {
          type: Sequelize.TEXT,
          allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      domainId: {
          type: Sequelize.INTEGER,
          references: {
              model: 'domains',
              key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('opinions');
  }
};