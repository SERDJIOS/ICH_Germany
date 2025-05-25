'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Apps', [
      { name: 'Telegram', size: 150.5 },
      { name: 'WhatsApp', size: 120.3 },
      { name: 'Instagram', size: 250.7 }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Apps', null, {});
  }
};
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
