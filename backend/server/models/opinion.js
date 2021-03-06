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
      },
      isSafe: {
          type: DataTypes.BOOLEAN,
          allowNull: false
      },
      value: {
          type: DataTypes.DOUBLE,
          allowNull: false
      }
  }, {});
  Opinion.associate = function(models) {
      Opinion.belongsTo(models.domain, {
          foreignKey: 'domainId',
          onDelete: 'cascade'
      });
      Opinion.belongsTo(models.user, {
          foreignKey: 'userId',
          onDelete: 'cascade'
      });
      Opinion.hasMany(models.comment, {
          as: 'comment',
          foreignKey: 'opinionId'
      });
      Opinion.hasMany(models.voteOpinion, {
          as: 'voteOpinion',
          foreignKey: 'opinionId'
      });
  };
  return Opinion;
};