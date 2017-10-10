'use strict';
module.exports = (sequelize, DataTypes) => {
  var Owner = sequelize.define('Owner', {
    UserId: DataTypes.INTEGER,
    GroupId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Owner.associate= models=>{
    Owner.belongsTo(models.User)
    Owner.hasOne(models.Group)

  }

  return Owner;
};
