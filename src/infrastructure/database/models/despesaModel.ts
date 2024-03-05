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
  criadoEm!: Date;
  alteradoEm!: Date;
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
  },
  criadoEm: {
    type: DATE,
    allowNull: false,
  },
  alteradoEm: {
    type: DATE,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'despesas',
  underscored: true,
});

DespesaModel.belongsTo(UsuarioModel, { foreignKey: 'idUsuario', as: 'usuario' });

export default DespesaModel;