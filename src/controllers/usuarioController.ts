import { Request, Response } from "express";
import { IUsuarioService } from "../services/interfaces/IUsuarioService";

export class UsuarioController {
	constructor(private _usuarioService: IUsuarioService) {
	}

	async cadastrarUsuario(request: Request, response: Response): Promise<Response> {
		throw new Error("Method not implemented.");
	}

	async excluirCadastroUsuario(request: Request, response: Response): Promise<Response> {
		throw new Error("Method not implemented.");
	}

	async entrarUsuario(request: Request, response: Response): Promise<Response> {
		throw new Error("Method not implemented.");
	}
}