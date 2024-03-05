/** @type {import('sequelize-cli').QueryInterface} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('usuarios', [{
      id: '6d3143ab-390e-4c1f-9bd5-e6fc71b2d7f7',
      email: `fulano.6d3143ab-390e-4c1f-9bd5-e6fc71b2d7f7@gmail.com`,
      password_hash: '123',
      nome: 'Fulano',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
