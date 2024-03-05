import { Request, Response } from "express";
import { IDespesaService } from "../services/interfaces/IDespesaService";

export class DespesaController {
	constructor(private _despesaService: IDespesaService) {
	}

	async cadastrarDespesa(request: Request, response: Response): Promise<Response> {
		try {
			this._despesaService.cadastrarDespesa({ idUsuario: request.headers.idUsuario, ...request.body });
			return response.status(201).send();
		} catch (error) {
			return response.status(400).json({
				message: error.message || "Ocorreu um erro inesperado."
			});
		}
	}

	async atualizarDespesa(request: Request, response: Response): Promise<Response> {
		try {
			this._despesaService.atualizarDespesa({ idUsuario: request.headers.idUsuario, ...request.body });
			return response.status(201).send();
		} catch (error) {
			return response.status(400).json({
				message: error.message || "Ocorreu um erro inesperado."
			});
		}
	}

	async obterDespesa(request: Request, response: Response): Promise<Response> {
		try {
			const despesa = await this._despesaService.obterDespesa(request.params.id as string);
			return response.status(200).json(despesa);
		} catch (error) {
			return response.status(400).json({
				message: error.message || "Ocorreu um erro inesperado."
			});
		}
	}

	async excluirDespesa(request: Request, response: Response): Promise<Response> {
		try {
			this._despesaService.excluirDespesa(request.params.id as string);
			return response.status(204).send();
		} catch (error) {
			return response.status(400).json({
				message: error.message || "Ocorreu um erro inesperado."
			});
		}
	}
}