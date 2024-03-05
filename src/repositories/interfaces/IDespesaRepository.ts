import { Despesa } from "../../domain/despesa";

export interface IDespesaRepository {
    criar(despesa: Despesa): Promise<void>;
    atualizar(despesa: Despesa): Promise<void>;
    deletar(id: string): Promise<void>;
    buscarPorId(id: string): Promise<void>;
}