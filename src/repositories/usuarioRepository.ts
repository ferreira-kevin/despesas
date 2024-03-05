import { Despesa } from "../domain/despesa";
import { IDespesaRepository } from "./interfaces/IDespesaRepository";

export class DespesaRepository implements IDespesaRepository{
    constructor() {
    }

    criar(despesa: Despesa): Promise<void> {
        throw new Error("Method not implemented.");
    }
    atualizar(despesa: Despesa): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deletar(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    buscarPorId(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}