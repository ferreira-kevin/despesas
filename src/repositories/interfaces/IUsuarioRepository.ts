import { Usuario } from "../../domain/usuario";

export interface IUsuarioRepository {
    criar(usuario: Usuario): Promise<void>;
    deletar(usuario: Usuario): Promise<void>;
    buscarPorEmail(email: string): Promise<void>;
}