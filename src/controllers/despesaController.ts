import { Request, Response } from "express";
import { IDespesaService } from "../services/interfaces/IDespesaService";

export class DespesaController {
	constructor(private _despesaService: IDespesaService) {
	}

	async cadastrarDespesa(request: Request, response: Response): Promise<Response> {
		throw new Error("Method not implemented.");
	}

	async atualizarDespesa(request: Request, response: Response): Promise<Response> {
		throw new Error("Method not implemented.");
	}

	async obterDespesa(request: Request, response: Response): Promise<Response> {
		throw new Error("Method not implemented.");
	}

	async excluirDespesa(request: Request, response: Response): Promise<Response> {
		throw new Error("Method not implemented.");
	}
}