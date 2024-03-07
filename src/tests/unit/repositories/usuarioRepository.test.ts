import UsuarioModel from "../../../infrastructure/database/models/usuarioModel";
import { UsuarioRepository } from "../../../repositories/usuarioRepository";

jest.mock('../../../infrastructure/database/models/usuarioModel', () => ({
    create: jest.fn(),
    destroy: jest.fn(),
    findOne: jest.fn(),
}));

const usuarioRepository = new UsuarioRepository();

describe('UsuarioRepository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Deve criar um usuário', async () => {
        const usuarioMock = {
            id: '123',
            nome: 'Teste',
            email: 'teste@teste.com',
            passwordHash: 'senha123',
        };

        await usuarioRepository.criar(usuarioMock as UsuarioModel);

        expect(UsuarioModel.create).toHaveBeenCalledWith(usuarioMock);
    });

    it('Deve deletar um usuário', async () => {
        const idUsuario = '123';
        await usuarioRepository.deletar(idUsuario);

        expect(UsuarioModel.destroy).toHaveBeenCalledWith({ where: { id: idUsuario }});
    });

    it('Deve buscar um usuário por e-mail', async () => {
        const emailUsuario = 'teste@teste.com';
        await usuarioRepository.buscarPorEmail(emailUsuario);

        expect(UsuarioModel.findOne).toHaveBeenCalledWith({ where: { email: emailUsuario }});
    });

    it('Deve buscar um usuário por id', async () => {
        const idUsuario = '123';
        await usuarioRepository.buscarPorId(idUsuario);

        expect(UsuarioModel.findOne).toHaveBeenCalledWith({ where: { id: idUsuario }});
    });
});
