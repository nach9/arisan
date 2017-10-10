'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    UserId: DataTypes.INTEGER,
    GroupId: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    payedAt: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Transaction;
};