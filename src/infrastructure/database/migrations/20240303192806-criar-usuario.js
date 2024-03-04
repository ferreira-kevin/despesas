'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      passwordHash: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'password_hash'
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
    await queryInterface.dropTable('usuarios');
  }
};
