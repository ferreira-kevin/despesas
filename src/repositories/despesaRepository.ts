import { Usuario } from "../domain/usuario";
import { IUsuarioRepository } from "./interfaces/IUsuarioRepository";

export class UsuarioRepository implements IUsuarioRepository {
    criar(usuario: Usuario): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deletar(usuario: Usuario): Promise<void> {
        throw new Error("Method not implemented.");
    }
    buscarPorEmail(email: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}