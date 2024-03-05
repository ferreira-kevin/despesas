import { DATE, FLOAT, Model, STRING } from 'sequelize';
import db from '.';
import sequelize from 'sequelize';
import UsuarioModel from './usuarioModel';

class DespesaModel extends Model {
  id!: string;
  idUsuario!: string;
  descricao!: string;
  data!: Date;
  valor!: number;
}

DespesaModel.init({
  id: {
    type: sequelize.UUID,
    allowNull: false,
    primaryKey: true,
  },
  idUsuario: {
    type: sequelize.UUID,
    allowNull: false,
  },
  descricao: {
    type: STRING(191),
    allowNull: false,
  },
  data: {
    type: DATE,
    allowNull: false,
  },
  valor: {
    type: FLOAT,
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'despesas',
  underscored: true,
  timestamps: true
});

DespesaModel.belongsTo(UsuarioModel, { foreignKey: 'idUsuario', as: 'usuario' });

export default DespesaModel;