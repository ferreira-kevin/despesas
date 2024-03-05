import { Model, STRING } from 'sequelize';
import db from '.';
import sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UsuarioModel extends Model {
  id!: string;
  email!: string;
  passwordHash!: string;
  nome!: string;

  alterarUsuario(nome: string, email: string, passwordHash: string) {
		this.nome = nome;
		this.email = email;
		this.passwordHash = passwordHash;
	}

	static async encriptarPassword(password: string) : Promise<string> {
		return await bcrypt.hash(password, 8);
	}

	async checkPassword(password: string) : Promise<boolean> {
		return await bcrypt.compare(password, this.passwordHash);
	}

	generateToken() : string {
		return jwt.sign({ id: this.id }, process.env.APP_SECRET, {
			expiresIn: 3600
		});
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
  }
}, {
  sequelize: db,
  modelName: 'usuarios',
  underscored: true,
  timestamps: true
});

export default UsuarioModel;