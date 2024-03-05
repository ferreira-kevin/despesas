import { Despesa } from "../domain/despesa";
import { IEmailAgent } from "../infrastructure/agents/IEmailAgent";
import { IDespesaRepository } from "../repositories/interfaces/IDespesaRepository";

export class DespesaService {

    constructor(private _despesaRepository: IDespesaRepository, private _emailAgent: IEmailAgent) {
    }

    async criar(despesa: Despesa) {
    }
}