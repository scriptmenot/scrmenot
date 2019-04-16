'use strict';
module.exports = (sequelize, DataTypes) => {
  const Opinion = sequelize.define('opinion', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      title: {
          type: DataTypes.STRING,
          allowNull: false
      },
      content: {
          type: DataTypes.TEXT,
          allowNull: false
      }
  }, {});
  Opinion.associate = function(models) {
      Opinion.belongsTo(models.domain, {
          foreignKey: 'domainId',
          onDelete: 'cascade'
      })
  };
  return Opinion;
};