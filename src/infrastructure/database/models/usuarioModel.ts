import { DATE, Model, STRING } from 'sequelize';
import db from '.';
import sequelize from 'sequelize';

class UsuarioModel extends Model {
  id!: string;
  email!: string;
  passwordHash!: string;
  nome!: string;
  criadoEm!: Date;
  alteradoEm!: Date;
}

UsuarioModel.init({
  id: {
    type: sequelize.UUID,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: STRING,
    allowNull: false
  },
  passwordHash: {
    type: STRING,
    allowNull: false
  },
  nome: {
    type: STRING,
    allowNull: false
  },
  criadoEm: {
    type: DATE,
    allowNull: false
  },
  alteradoEm: {
    type: DATE,
    allowNull: false
  },
}, {
  sequelize: db,
  modelName: 'usuarios',
  underscored: true
});

export default UsuarioModel;