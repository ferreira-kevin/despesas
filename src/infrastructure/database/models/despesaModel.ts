import { DATE, FLOAT, Model, STRING } from 'sequelize';
import db from '.';
import sequelize from 'sequelize';
import Usuario from './usuarioModel';

class Despesa extends Model {
  id!: string;
  idUsuario!: string;
  descricao!: string;
  data!: Date;
  valor!: number;
  criadoEm!: Date;
  alteradoEm!: Date;
}

Despesa.init({
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

Despesa.belongsTo(Usuario, { foreignKey: 'idUsuario', as: 'usuario' });

export default Despesa;