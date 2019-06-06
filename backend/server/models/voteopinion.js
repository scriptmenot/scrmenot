'use strict';
module.exports = (sequelize, DataTypes) => {
  const VoteOpinion = sequelize.define('voteOpinion', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      value: {
        type: DataTypes.DOUBLE,
        allowNull: false
      }
  }, {});
  VoteOpinion.associate = function(models) {
      VoteOpinion.belongsTo(models.opinion, {
          foreignKey: 'opinionId',
          onDelete: 'cascade'
      });
      VoteOpinion.belongsTo(models.user, {
          foreignKey: 'userId',
          onDelete: 'cascade'
      });
  };
  return VoteOpinion;
};