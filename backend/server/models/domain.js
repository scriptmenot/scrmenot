'use strict';
module.exports = (sequelize, DataTypes) => {
  const Domain = sequelize.define('Domain', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      additionDate: {
          type: DataTypes.DATE,
          allowNull: false
      },
      isAccepted: {
          type: DataTypes.BOOLEAN,
          allowNull: false
      },
      safety: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      uri: {
          type: DataTypes.STRING,
          allowNull: false
      }
  }, {});
  Domain.associate = function(models) {
    // associations can be defined here
  };
  return Domain;
};