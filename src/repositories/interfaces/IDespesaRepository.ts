import DespesaModel from "../../infrastructure/database/models/despesaModel";

export interface IDespesaRepository {
    criar(despesa: DespesaModel): Promise<void>;
    atualizar(despesa: DespesaModel): Promise<void>;
    deletar(id: string): Promise<void>;
    buscarPorId(id: string): Promise<DespesaModel>;
    listarPorIdUsuario(idUsuario: string): Promise<DespesaModel[]>;
}