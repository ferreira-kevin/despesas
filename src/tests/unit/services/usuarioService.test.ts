import { UsuarioDto } from "../../../controllers/dtos/usuarioDto";
import UsuarioModel from "../../../infrastructure/database/models/usuarioModel";
import { IUsuarioRepository } from "../../../repositories/interfaces/IUsuarioRepository";
import { UsuarioService } from "../../../services/usuarioService";

const mockUsuarioRepository = {
    buscarPorEmail: jest.fn(),
    buscarPorId: jest.fn(),
    criar: jest.fn(),
    deletar: jest.fn(),
};

const usuarioService = new UsuarioService(mockUsuarioRepository as IUsuarioRepository);

describe('UsuarioService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('cadastrarUsuario', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('Deve cadastrar um novo usuário com sucesso', async () => {
            const usuarioDto: UsuarioDto = {
                nome: 'Teste',
                email: 'teste@teste.com',
                password: 'senha123',
            };

            mockUsuarioRepository.buscarPorEmail.mockResolvedValue(undefined);

            await usuarioService.cadastrarUsuario(usuarioDto);

            expect(mockUsuarioRepository.buscarPorEmail).toHaveBeenCalledWith(usuarioDto.email);
            expect(mockUsuarioRepository.criar).toHaveBeenCalled();
        });

        it('Deve lançar um erro se o usuário já estiver cadastrado', async () => {
            const usuarioDto: UsuarioDto = {
                nome: 'Teste',
                email: 'teste@teste.com',
                password: 'senha123',
            };

            const usuarioExistente = new UsuarioModel();
            mockUsuarioRepository.buscarPorEmail.mockResolvedValue(usuarioExistente);

            await expect(usuarioService.cadastrarUsuario(usuarioDto)).rejects.toThrow('Usuário já cadastrado.');
            expect(mockUsuarioRepository.buscarPorEmail).toHaveBeenCalledWith(usuarioDto.email);
            expect(mockUsuarioRepository.criar).not.toHaveBeenCalled();
        });
    });

    describe('entrarUsuario', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('Deve entrar um usuário com sucesso', async () => {
            const usuarioDto: UsuarioDto = {
                email: 'teste@teste.com',
                password: 'senha123',
            };

            const usuarioModel = new UsuarioModel();
            usuarioModel.checkPassword = jest.fn().mockReturnValue(true);
            usuarioModel.generateToken = jest.fn().mockReturnValue('token');

            mockUsuarioRepository.buscarPorEmail.mockResolvedValue(usuarioModel);

            const result = await usuarioService.entrarUsuario(usuarioDto);

            expect(mockUsuarioRepository.buscarPorEmail).toHaveBeenCalledWith(usuarioDto.email);
            expect(usuarioModel.checkPassword).toHaveBeenCalledWith(usuarioDto.password);
            expect(usuarioModel.generateToken).toHaveBeenCalled();
            expect(result).toBe('token');
        });

        it('Deve lançar um erro se as credenciais forem inválidas', async () => {
            const usuarioDto: UsuarioDto = {
                email: 'teste@teste.com',
                password: 'senha123',
            };

            const usuarioModel = new UsuarioModel();
            usuarioModel.checkPassword = jest.fn().mockReturnValue(false);

            mockUsuarioRepository.buscarPorEmail.mockResolvedValue(usuarioModel);

            await expect(usuarioService.entrarUsuario(usuarioDto)).rejects.toThrow('Credenciais inválidas.');
            expect(mockUsuarioRepository.buscarPorEmail).toHaveBeenCalledWith(usuarioDto.email);
            expect(usuarioModel.checkPassword).toHaveBeenCalledWith(usuarioDto.password);
        });
    });

    describe('excluirUsuario', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('Deve excluir um usuário com sucesso', async () => {
            const idUsuario = '123';

            await usuarioService.excluirUsuario(idUsuario);

            expect(mockUsuarioRepository.deletar).toHaveBeenCalledWith(idUsuario);
        });
    });
});
