'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('despesas', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      idUsuario: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'id_usuario'
      },
      descricao: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false
      },
      valor: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      criadoEm: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'criado_em'
      },
      alteradoEm: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'alterado_em'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('despesas');
  }
};
