'use strict';
module.exports = (sequelize, DataTypes) => {
  const VoteDomain = sequelize.define('voteDomain', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
  }, {});
  VoteDomain.associate = function(models) {
      VoteDomain.belongsTo(models.opinion, {
          foreignKey: 'domainId',
          onDelete: 'cascade'
      })
  };
  return VoteDomain;
};