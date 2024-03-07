import { UsuarioDto } from "../controllers/dtos/usuarioDto";
import { IUsuarioRepository } from "../repositories/interfaces/IUsuarioRepository"
import { IUsuarioService } from "./interfaces/IUsuarioService";
import UsuarioModel from "../infrastructure/database/models/usuarioModel";
import { Utils } from "../shared/utils";

export class UsuarioService implements IUsuarioService {

    constructor(private _usuarioRepository: IUsuarioRepository) {
    }

    async cadastrarUsuario(usuarioDto: UsuarioDto): Promise<void> {
        let usuarioModel = await this._usuarioRepository.buscarPorEmail(usuarioDto.email);

        if (usuarioModel) {
            throw new Error("Usuário já cadastrado.");
        }
        
        usuarioModel = new UsuarioModel();
        usuarioModel.id = Utils.uuid();
        usuarioModel.nome = usuarioDto.nome;
        usuarioModel.email = usuarioDto.email;
        usuarioModel.passwordHash = await UsuarioModel.encriptarPassword(usuarioDto.password);

        await this._usuarioRepository.criar(usuarioModel);
    }

    async entrarUsuario(usuarioDto: UsuarioDto): Promise<string> {
        const usuarioModel = await this._usuarioRepository.buscarPorEmail(usuarioDto.email);
        
        if (!usuarioModel) {
            throw new Error("Credenciais inválidas.");
        }

        if (usuarioModel.checkPassword(usuarioDto.password)) {
            return usuarioModel.generateToken();
        } else {
            throw new Error("Credenciais inválidas.");
        }
    }

    async excluirUsuario(idUsuario: string): Promise<void> {
        await this._usuarioRepository.deletar(idUsuario);
    }
}