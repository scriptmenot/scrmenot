'use strict';
module.exports = (sequelize, DataTypes) => {
  const opinion = sequelize.define('opinion', {
    id: DataTypes.INTEGER
  }, {});
  opinion.associate = function(models) {
    // associations can be defined here
  };
  return opinion;
};