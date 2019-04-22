'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      content: {
          type: DataTypes.TEXT,
          allowNull: false
      }
  }, {});
  Comment.associate = function(models) {
      Comment.belongsTo(models.opinion, {
          foreignKey: 'opinionId',
          onDelete: 'cascade'
      })
  };
  return Comment;
};