'use strict';
module.exports = (sequelize, DataTypes) => {
  var Group = sequelize.define('Group', {
    groupName: DataTypes.STRING,
    description: DataTypes.STRING,
    startAt: DataTypes.DATE,
    closeAt: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Group.associate= models=>{
    Group.belongsTo(models.Owner)
    Group.belongsToMay(models.User{through:'UserGroup'})

  }
  return Group;
};
