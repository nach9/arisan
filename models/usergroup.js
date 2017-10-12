'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserGroup = sequelize.define('UserGroup', {
    UserId: DataTypes.INTEGER,
    GroupId: DataTypes.INTEGER,
    winAt: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  // UserGroup.associate= models=>{
  //   UserGroup.hasMany(models.Transaction,{ foreignKey: 'UserGroupId'})
  // }



  return UserGroup;
};
