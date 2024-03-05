import { Entidade } from "./entidade";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class Usuario extends Entidade {
	public nome: string;
	public email: string;
	public passwordHash: string;

	constructor(nome: string, email: string, passwordHash: string, id?: string) {
		super(id);

		this.nome = nome;
		this.email = email;
		this.passwordHash = passwordHash;
	}

	alterarUsuario(nome: string, email: string, passwordHash: string) {
		this.nome = nome;
		this.email = email;
		this.passwordHash = passwordHash;
		this.alterar();
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