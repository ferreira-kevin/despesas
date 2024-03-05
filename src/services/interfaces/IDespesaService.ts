import { DespesaDto } from "../../controllers/dtos/despesaDto";
import { Despesa } from "../../domain/despesa";

export interface IDespesaService {
    cadastrarDespesa(despesaDto: DespesaDto): Promise<void>;
    atualizarDespesa(despesaDto: DespesaDto): Promise<void>;
    obterDespesa(idDespesa: string): Promise<Despesa> ;
    excluirDespesa(idDespesa: string): Promise<void>;
}