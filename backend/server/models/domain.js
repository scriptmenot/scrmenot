'use strict';
module.exports = (sequelize, DataTypes) => {
  const Domain = sequelize.define('domain', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      isAccepted: {
          type: DataTypes.BOOLEAN,
          allowNull: false
      },
      uri: {
          type: DataTypes.STRING,
          allowNull: false
      }
  }, {});
  Domain.associate = function(models) {
      Domain.hasMany(models.opinion, {
          as: 'opinion',
          foreignKey: 'domainId'
      })
  };
  return Domain;
};