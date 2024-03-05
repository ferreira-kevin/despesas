import { plainToClass } from "class-transformer";
import { UsuarioDto } from "../controllers/dtos/usuarioDto";
import { Usuario } from "../domain/usuario";
import { IUsuarioRepository } from "../repositories/interfaces/IUsuarioRepository"
import { IUsuarioService } from "./interfaces/IUsuarioService";
import UsuarioModel from "../infrastructure/database/models/usuarioModel";

export class UsuarioService implements IUsuarioService {

    constructor(private _usuarioRepository: IUsuarioRepository) {
    }

    async cadastrarUsuario(usuarioDto: UsuarioDto): Promise<void> {
        let usuarioModel = await this._usuarioRepository.buscarPorEmail(usuarioDto.email);

        if (usuarioModel) {
            throw new Error("Usuário já cadastrado.");
        }

        const usuario = new Usuario(
            usuarioDto.nome,
            usuarioDto.email,
            await Usuario.encriptarPassword(usuarioDto.password)
        );

        usuarioModel = plainToClass(UsuarioModel, usuario);

        await this._usuarioRepository.criar(usuarioModel);
    }

    async entrarUsuario(usuarioDto: UsuarioDto): Promise<string> {
        const usuarioModel = await this._usuarioRepository.buscarPorEmail(usuarioDto.email);
        
        if (!usuarioModel) {
            throw new Error("Credenciais inválidas.");
        }

        const usuario = plainToClass(Usuario, usuarioModel);
        
        if (usuario.checkPassword(usuarioDto.password)) {
            return usuario.generateToken();
        } else {
            throw new Error("Credenciais inválidas.");
        }
    }

    async excluirUsuario(idUsuario: string): Promise<void> {
        await this._usuarioRepository.deletar(idUsuario);
    }
}