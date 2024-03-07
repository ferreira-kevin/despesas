import { Request, Response } from "express";
import { IUsuarioService } from "../services/interfaces/IUsuarioService";
import { UsuarioDto } from "./dtos/usuarioDto";

export class UsuarioController {
	constructor(private _usuarioService: IUsuarioService) {
	}

	async cadastrarUsuario(request: Request, response: Response): Promise<Response> {
		 /*
            #swagger.tags = ['Usuarios']
            #swagger.summary = 'Criar um novo usuário'
            #swagger.description = 'Este endpoint irá criar um novo usuário.'
        */
		const cadastrarUsuarioRequest = request.body as UsuarioDto;
		/*  
			#swagger.requestBody = {
				required: true,
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/CadastrarUsuarioRequest"
						}  
					}
				}
			} 
        */
		try {
			await this._usuarioService.cadastrarUsuario(cadastrarUsuarioRequest);
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
			return response.status(204).send();
		} catch (error) {
			return response.status(400).json({
				message: error.message || "Ocorreu um erro inesperado."
			});
		}
	}

	async entrarUsuario(request: Request, response: Response): Promise<Response> {
		try {
			const token = await this._usuarioService.entrarUsuario(request.body);
			return response.status(200).json({ token: token });
		} catch (error) {
			return response.status(401).json({
				message: error.message || "Ocorreu um erro inesperado."
			});
		}
	}
}