import { UsuarioDto } from "../../controllers/dtos/usuarioDto";

export interface IUsuarioService {
    cadastrarUsuario(usuarioDto: UsuarioDto): Promise<void>;
    entrarUsuario(usuarioDto: UsuarioDto): Promise<string>;
    excluirUsuario(idUsuario: string): Promise<void>;
}