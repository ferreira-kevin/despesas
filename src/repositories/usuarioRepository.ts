import UsuarioModel from "../infrastructure/database/models/usuarioModel";
import { IUsuarioRepository } from "./interfaces/IUsuarioRepository";

export class UsuarioRepository implements IUsuarioRepository {
    async criar(usuarioModel: UsuarioModel): Promise<void> {
        await UsuarioModel.create({
            id: usuarioModel.id,
            email: usuarioModel.email,
            passwordHash: usuarioModel.passwordHash,
            nome: usuarioModel.nome
        });
    }

    async deletar(id: string): Promise<void> {
        await UsuarioModel.destroy({ where: { id }});;
    }

    async buscarPorEmail(email: string): Promise<UsuarioModel> {
        return await UsuarioModel.findOne({ where: { email }});
    }

    async buscarPorId(id: string): Promise<UsuarioModel> {
        return await UsuarioModel.findOne({ where: { id }});
    }
}
