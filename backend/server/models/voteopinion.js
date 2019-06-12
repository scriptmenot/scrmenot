'use strict';
module.exports = (sequelize, DataTypes) => {
  const VoteOpinion = sequelize.define('voteOpinion', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      isUpvote: {
          type: DataTypes.BOOLEAN,
          allowNull: false
      }
      ,
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