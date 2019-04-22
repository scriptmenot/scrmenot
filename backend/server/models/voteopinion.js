'use strict';
module.exports = (sequelize, DataTypes) => {
  const voteOpinion = sequelize.define('voteOpinion', {
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
  voteOpinion.associate = function(models) {
      voteOpinion.belongsTo(models.opinion, {
          foreignKey: 'opinionId',
          onDelete: 'cascade'
      })
  };
  return voteOpinion;
};