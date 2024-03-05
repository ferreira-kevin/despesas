import { DATE, Model, STRING } from 'sequelize';
import db from '.';
import sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UsuarioModel extends Model {
  id!: string;
  email!: string;
  passwordHash!: string;
  nome!: string;
  criadoEm!: Date;
  alteradoEm!: Date;

  checkPassword(password: string) {
    return bcrypt.compare(password, this.passwordHash);
  }

  generateToken() {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET);
  }
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