'use strict';
const fullname = require('../helpers/fullName')

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    role: DataTypes.STRING

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  User.associate= models=>{
    User.hasMany(models.Owner)
    User.belongsToMany(models.Group,{through:'UserGroup'})


  }

  User.prototype.getFullName = function() {
    return fullname(this.firstName, this.lastName)
  };

  return User;
};
