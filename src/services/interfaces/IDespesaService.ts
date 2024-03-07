import { DespesaDto } from "../../controllers/dtos/despesaDto";
import DespesaModel from "../../infrastructure/database/models/despesaModel";

export interface IDespesaService {
    cadastrarDespesa(despesaDto: DespesaDto): Promise<void>;
    atualizarDespesa(despesaDto: DespesaDto): Promise<void>;
    obterDespesa(idDespesa: string): Promise<DespesaModel>;
    listarDespesas(idUsuario: string): Promise<DespesaModel[]>;
    excluirDespesa(idDespesa: string): Promise<void>;
}