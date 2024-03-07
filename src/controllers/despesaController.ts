import { Request, Response } from "express";
import { IDespesaService } from "../services/interfaces/IDespesaService";

export class DespesaController {
	constructor(private _despesaService: IDespesaService) {
	}

	async cadastrarDespesa(request: Request, response: Response): Promise<Response> {
		/*
			#swagger.tags = ['Despesas']
			#swagger.summary = 'Cadastrar uma nova despesa'
			#swagger.description = 'Este endpoint permite cadastrar uma nova despesa.'
			#swagger.parameters['obj'] = {
				in: 'body',
				description: 'Objeto contendo os dados da despesa a ser cadastrada.',
				required: true,
				schema: {
					$ref: '#/definitions/Despesa'
				}
			}
			#swagger.responses[201] = {
				description: 'Despesa cadastrada com sucesso.'
			}
			#swagger.responses[400] = {
				description: 'Erro ao cadastrar a despesa.'
			}
		*/
		try {
			await this._despesaService.cadastrarDespesa({ idUsuario: request.headers.idUsuario, ...request.body });
			return response.status(201).send();
		} catch (error) {
			return response.status(400).json({
				message: error.message || "Ocorreu um erro inesperado."
			});
		}
	}

	async atualizarDespesa(request: Request, response: Response): Promise<Response> {
		/*
			#swagger.tags = ['Despesas']
			#swagger.summary = 'Atualizar uma despesa'
			#swagger.description = 'Este endpoint permite atualizar uma despesa existente.'
			#swagger.parameters['obj'] = {
				in: 'body',
				description: 'Objeto contendo os dados atualizados da despesa.',
				required: true,
				schema: {
					$ref: '#/definitions/Despesa'
				}
			}
			#swagger.responses[201] = {
				description: 'Despesa atualizada com sucesso.'
			}
			#swagger.responses[400] = {
				description: 'Erro ao atualizar a despesa.'
			}
		*/
		try {
			await this._despesaService.atualizarDespesa({ idUsuario: request.headers.idUsuario, ...request.body });
			return response.status(201).send();
		} catch (error) {
			return response.status(400).json({
				message: error.message || "Ocorreu um erro inesperado."
			});
		}
	}

	async obterDespesa(request: Request, response: Response): Promise<Response> {
		/*
			#swagger.tags = ['Despesas']
			#swagger.summary = 'Obter uma despesa'
			#swagger.description = 'Este endpoint permite obter os detalhes de uma despesa existente.'
			#swagger.parameters['id'] = {
				in: 'path',
				description: 'ID da despesa a ser obtida.',
				required: true,
				type: 'string'
			}
			#swagger.responses[200] = {
				description: 'Detalhes da despesa obtidos com sucesso.',
				schema: {
					$ref: '#/definitions/Despesa'
				}
			}
			#swagger.responses[400] = {
				description: 'Erro ao obter os detalhes da despesa.'
			}
		*/
		try {
			const despesa = await this._despesaService.obterDespesa(request.params.id as string);
			return response.status(200).json(despesa);
		} catch (error) {
			return response.status(400).json({
				message: error.message || "Ocorreu um erro inesperado."
			});
		}
	}

	async listarDespesas(request: Request, response: Response): Promise<Response> {
		/*
			#swagger.tags = ['Despesas']
			#swagger.summary = 'Listar despesas'
			#swagger.description = 'Este endpoint permite listar todas as despesas do usuário.'
			#swagger.parameters['idUsuario'] = {
				in: 'header',
				description: 'ID do usuário para o qual as despesas devem ser listadas.',
				required: true,
				type: 'string'
			}
			#swagger.responses[200] = {
				description: 'Despesas listadas com sucesso.',
				schema: {
					$ref: '#/definitions/Despesa[]'
				}
			}
			#swagger.responses[400] = {
				description: 'Erro ao listar as despesas.'
			}
		*/
		try {
			const despesas = await this._despesaService.listarDespesas(request.headers.idUsuario as string);
			return response.status(200).json(despesas);
		} catch (error) {
			return response.status(400).json({
				message: error.message || "Ocorreu um erro inesperado."
			});
		}
	}

	async excluirDespesa(request: Request, response: Response): Promise<Response> {
		/*
			#swagger.tags = ['Despesas']
			#swagger.summary = 'Excluir uma despesa'
			#swagger.description = 'Este endpoint permite excluir uma despesa.'
			#swagger.parameters['id'] = {
				in: 'path',
				description: 'ID da despesa a ser excluída.',
				required: true,
				type: 'string'
			}
			#swagger.responses[204] = {
				description: 'Despesa excluída com sucesso.'
			}
			#swagger.responses[400] = {
				description: 'Erro ao excluir a despesa.'
			}
		*/
		try {
			await this._despesaService.excluirDespesa(request.params.id as string);
			return response.status(204).send();
		} catch (error) {
			return response.status(400).json({
				message: error.message || "Ocorreu um erro inesperado."
			});
		}
	}
}