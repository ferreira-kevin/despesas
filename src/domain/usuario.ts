import { Entidade } from "./entidade";
import bcrypt from "bcrypt";

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

	public alterarUsuario(nome: string, email: string, passwordHash: string) {
		this.nome = nome;
		this.email = email;
		this.passwordHash = passwordHash;
		this.alterar();
	}

	async encryptarPassword(password: string) : Promise<string> {
		return await bcrypt.hash(password, 8);
	}
}