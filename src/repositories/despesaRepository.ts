import DespesaModel from "../infrastructure/database/models/despesaModel";
import { IDespesaRepository } from "./interfaces/IDespesaRepository";

export class DespesaRepository implements IDespesaRepository{
    constructor() {
    }

    async criar(despesa: DespesaModel): Promise<void> {
        await DespesaModel.create({
            id: despesa.id,
            idUsuario: despesa.idUsuario,
            descricao: despesa.descricao,
            data: despesa.data,
            valor: despesa.valor
        });
    }

    async atualizar(despesa: DespesaModel): Promise<void> {
        await DespesaModel.update(despesa, {where: { id: despesa.id}});
    }

    async deletar(id: string): Promise<void> {
        await DespesaModel.destroy({ where: { id }});;
    }

    async buscarPorId(id: string): Promise<DespesaModel> {
        return await DespesaModel.findOne({ where: { id }});
    }
}