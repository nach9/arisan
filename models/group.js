'use strict';
const statusGroup = require('../helpers/statusGroup')
module.exports = (sequelize, DataTypes) => {
  var Group = sequelize.define('Group', {
    groupName: DataTypes.STRING,
    description: DataTypes.STRING,
    startAt: DataTypes.DATE,
    closeAt: DataTypes.DATE,
    amount:DataTypes.INTEGER

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Group.associate= models=>{
    // Group.belongsTo(models.Owner)
    Group.hasOne(models.Owner)
    Group.belongsToMany(models.User,{through:'UserGroup'})
  }

  Group.prototype.getStatusGroup = function () {
    return statusGroup(this.startAt,this.closeAt)
  };
  return Group;
};
