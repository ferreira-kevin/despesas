import { DespesaDto } from "../controllers/dtos/despesaDto";
import { IEmailAgent } from "../infrastructure/agents/IEmailAgent";
import { IDespesaRepository } from "../repositories/interfaces/IDespesaRepository";
import { IDespesaService } from "./interfaces/IDespesaService";
import DespesaModel from "../infrastructure/database/models/despesaModel";
import { IUsuarioRepository } from "../repositories/interfaces/IUsuarioRepository";
import { CorpoEmail } from "../utils/corpoEmail";
import uuid from "../utils/uuid";

export class DespesaService implements IDespesaService{

    constructor(private _despesaRepository: IDespesaRepository, private _usuarioRepository: IUsuarioRepository, private _emailAgent: IEmailAgent) {
    }

    async cadastrarDespesa(despesaDto: DespesaDto): Promise<void> {
        const usuario = await this._usuarioRepository.buscarPorId(despesaDto.idUsuario);

        if (!usuario) {
            throw new Error("Usuário inexistente.");
        }

        const despesaModel = new DespesaModel();
        despesaModel.id = uuid();
        despesaModel.descricao = despesaDto.descricao;
        despesaModel.data = despesaDto.data;
        despesaModel.idUsuario = despesaDto.idUsuario;
        despesaModel.valor = despesaDto.valor;

        await this._despesaRepository.criar(despesaModel);

        await this._emailAgent.sendMail({
            from: {
                email: process.env.SERVER_MAIL,
                name: process.env.SERVER_NAME
            },
            to: {
                email: usuario.email,
                name: usuario.nome
            },
            body: CorpoEmail.DespesaCadastrada(despesaModel, usuario.nome),
            subject: "despesa cadastrada"
        });
        
    }

    async atualizarDespesa(despesaDto: DespesaDto): Promise<void> {
        let despesaModel = await this._despesaRepository.buscarPorId(despesaDto.id);

        if (!despesaModel) {
            throw new Error("Despesa não encontrada.");
        }

        despesaModel.descricao = despesaDto.descricao;
        despesaModel.data = despesaDto.data;
        despesaModel.valor = despesaDto.valor;

        await this._despesaRepository.atualizar(despesaModel);
    }

    async obterDespesa(idDespesa: string): Promise<DespesaModel> {
        let despesaModel = await this._despesaRepository.buscarPorId(idDespesa);

        if (!despesaModel) {
            throw new Error("Despesa não encontrada.");
        }

        return despesaModel;
    }

    async listarDespesas(idUsuario: string): Promise<DespesaModel[]> {
        let despesas = await this._despesaRepository.listarPorIdUsuario(idUsuario);

        if (!despesas) {
            throw new Error("Despesa não encontrada.");
        }

        return despesas;
    }

    async excluirDespesa(idDespesa: string): Promise<void> {
        await this._despesaRepository.deletar(idDespesa);
    }
}