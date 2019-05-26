'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      username: {
          type: DataTypes.STRING,
          allowNull: false
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false
      },
  }, {});
  User.associate = function(models) {
      User.hasMany(models.comment, {
          as: 'comment',
          foreignKey: 'userId'
      });
      User.hasMany(models.domain, {
          as: 'domain',
          foreignKey: 'userId'
      });

  };
  return User;
};