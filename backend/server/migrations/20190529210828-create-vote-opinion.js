'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('voteOpinions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      opinionId: {
          type: Sequelize.INTEGER,
          references: {
              model: 'opinions',
              key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
      },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('voteOpinions');
  }
};