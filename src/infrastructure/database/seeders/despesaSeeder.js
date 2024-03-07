/** @type {import('sequelize-cli').QueryInterface} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('despesas', [
      {
        id: '6d3143ab-390e-4c1f-9bd5-e6fc71b2d7f7',
        descricao: 'Despesa 1',
        valor: 100.00,
        id_usuario: '6d3143ab-390e-4c1f-9bd5-e6fc71b2d7f7',
        data: new Date('2024-03-07T16:10:19.668Z'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '7a87e50d-c3bb-45f3-a8b0-2fd45fc4f4a2',
        descricao: 'Despesa 2',
        valor: 150.00,
        id_usuario: '6d3143ab-390e-4c1f-9bd5-e6fc71b2d7f7',
        data: new Date('07/03/2024 11:21:45'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '8c527e2a-5a84-4e78-b3e3-1e107f39a3f8',
        descricao: 'Despesa 3',
        valor: 300.00,
        id_usuario: '6d3143ab-390e-4c1f-9bd5-e6fc71b2d7f7',
        data: new Date('07/03/2024 11:22:45'),
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('despesas', null, {});
  }
};
