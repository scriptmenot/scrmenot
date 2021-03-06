'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('domains', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        uri: {
            allowNull: false,
            type: Sequelize.STRING
        },
        isAccepted: {
            allowNull: false,
            type: Sequelize.BOOLEAN
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
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
        return queryInterface.dropTable('domains');
    }
};