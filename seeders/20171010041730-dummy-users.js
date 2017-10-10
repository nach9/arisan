'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Doe' ,
        email: 'john@email.com',
        phone: '123',
        username: 'john',
        password: '3eff09af01499f5c91f5ba7eeb35deba',
        salt:'rxtp6uc6'
      },
      {
        firstName: 'Jane',
        lastName: 'Doe' ,
        email: 'jane@email.com',
        phone: '123',
        username: 'jane',
        password: '3eff09af01499f5c91f5ba7eeb35deba',
        salt:'rxtp6uc6'
      },
      {
        firstName: 'Bruce',
        lastName: 'Wayne' ,
        email: 'bruce@wayne.com',
        phone: '123',
        username: 'bruce',
        password: '3eff09af01499f5c91f5ba7eeb35deba',
        salt:'rxtp6uc6'
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
