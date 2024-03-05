import UsuarioModel from "../../infrastructure/database/models/usuarioModel";

export interface IUsuarioRepository {
    criar(usuario: UsuarioModel): Promise<void>;
    deletar(idUsuario: string): Promise<void>;
    buscarPorEmail(email: string): Promise<UsuarioModel>;
    buscarPorId(id: string): Promise<UsuarioModel>;
}