import { plainToClass } from "class-transformer";
import { DespesaDto } from "../controllers/dtos/despesaDto";
import { Despesa } from "../domain/despesa";
import { IEmailAgent } from "../infrastructure/agents/IEmailAgent";
import { IDespesaRepository } from "../repositories/interfaces/IDespesaRepository";
import { IDespesaService } from "./interfaces/IDespesaService";
import DespesaModel from "../infrastructure/database/models/despesaModel";
import { IUsuarioRepository } from "../repositories/interfaces/IUsuarioRepository";
import { CorpoEmail } from "../utils/corpoEmail";

export class DespesaService implements IDespesaService{

    constructor(private _despesaRepository: IDespesaRepository, private _usuarioRepository: IUsuarioRepository, private _emailAgent: IEmailAgent) {
    }

    async cadastrarDespesa(despesaDto: DespesaDto): Promise<void> {
        const usuario = await this._usuarioRepository.buscarPorEmail(despesaDto.idUsuario);

        if (usuario) {
            throw new Error("Usuário inexistente.");
        }

        const despesa = new Despesa(
            despesaDto.descricao,
            despesaDto.data,
            despesaDto.idUsuario,
            despesaDto.valor);

        const despesaModel = plainToClass(DespesaModel, despesa);

        this._despesaRepository.criar(despesaModel);

        this._emailAgent.sendMail({
            from: {
                email: process.env.SERVER_MAIL,
                name: process.env.SERVER_NAME
            },
            to: {
                email: usuario.email,
                name: usuario.nome
            },
            body: CorpoEmail.DespesaCadastrada(despesa, usuario.nome),
            subject: "despesa cadastrada"
        });
        
    }

    async atualizarDespesa(despesaDto: DespesaDto): Promise<void> {
        let despesaModel = await this._despesaRepository.buscarPorId(despesaDto.id);

        if (!despesaModel) {
            throw new Error("Despesa não encontrada.");
        }

        const despesa = plainToClass(Despesa, despesaModel);

        despesa.alterarDespesa(despesaDto.descricao, despesaDto.data, despesaDto.valor);

        despesaModel = plainToClass(DespesaModel, despesa);

        await this._despesaRepository.atualizar(despesaModel);
    }

    async obterDespesa(idDespesa: string): Promise<Despesa> {
        let despesaModel = await this._despesaRepository.buscarPorId(idDespesa);

        if (!despesaModel) {
            throw new Error("Despesa não encontrada.");
        }

        return plainToClass(Despesa, despesaModel);
    }

    async excluirDespesa(idDespesa: string): Promise<void> {
        await this._despesaRepository.deletar(idDespesa);
    }
}