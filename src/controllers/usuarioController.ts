import { Request, Response } from "express";
import { IUsuarioService } from "../services/interfaces/IUsuarioService";

export class UsuarioController {
	constructor(private _usuarioService: IUsuarioService) {
	}

	async cadastrarUsuario(request: Request, response: Response): Promise<Response> {
		try {
			await this._usuarioService.cadastrarUsuario(request.body);
			return response.status(201).send();
		} catch (error) {
			return response.status(400).json({
				message: error.message || "Ocorreu um erro inesperado."
			});
		}
	}

	async excluirCadastroUsuario(request: Request, response: Response): Promise<Response> {
		try {
			await this._usuarioService.excluirUsuario(request.query.id as string);
			return response.status(201).send();
		} catch (error) {
			return response.status(400).json({
				message: error.message || "Ocorreu um erro inesperado."
			});
		}
	}

	async entrarUsuario(request: Request, response: Response): Promise<Response> {
		try {
			const token = await this._usuarioService.entrarUsuario(request.body);
			return response.status(201).json({ token: token });
		} catch (error) {
			return response.status(401).json({
				message: error.message || "Ocorreu um erro inesperado."
			});
		}
	}
}