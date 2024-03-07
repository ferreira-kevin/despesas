
import { Request, Response } from 'express';
import { UsuarioController } from '../../../controllers/usuarioController';
import { IUsuarioService } from '../../../services/interfaces/IUsuarioService';

const usuarioServiceMock: jest.Mocked<IUsuarioService> = {
    cadastrarUsuario: jest.fn(),
    excluirUsuario: jest.fn(),
    entrarUsuario: jest.fn(),
};

const usuarioController = new UsuarioController(usuarioServiceMock);

describe('UsuarioController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('cadastrarUsuario', () => {
        it('deve retornar status 201 ao cadastrar um usuário com sucesso', async () => {
            const request = { body: {} } as Request;
            const response = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response;

            await usuarioController.cadastrarUsuario(request, response);

            expect(usuarioServiceMock.cadastrarUsuario).toHaveBeenCalled();
            expect(response.status).toHaveBeenCalledWith(201);
            expect(response.send).toHaveBeenCalled();
        });

        it('deve retornar status 400 e a mensagem de erro ao ocorrer um erro no cadastro do usuário', async () => {
            const errorMessage = 'Erro ao cadastrar usuário';
            usuarioServiceMock.cadastrarUsuario.mockRejectedValueOnce(new Error(errorMessage));

            const request = { body: {} } as Request;
            const response = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            await usuarioController.cadastrarUsuario(request, response);

            expect(usuarioServiceMock.cadastrarUsuario).toHaveBeenCalled();
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    });

    describe('excluirCadastroUsuario', () => {
        it('deve retornar status 204 ao excluir o cadastro de um usuário com sucesso', async () => {
            const request = { query: { id: 'user-id' } };
            const response = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response;

            await usuarioController.excluirCadastroUsuario(request as any, response);

            expect(usuarioServiceMock.excluirUsuario).toHaveBeenCalledWith('user-id');
            expect(response.status).toHaveBeenCalledWith(204);
            expect(response.send).toHaveBeenCalled();
        });

        it('deve retornar status 400 e a mensagem de erro ao ocorrer um erro na exclusão do cadastro do usuário', async () => {
            const errorMessage = 'Erro ao excluir cadastro do usuário';
            usuarioServiceMock.excluirUsuario.mockRejectedValueOnce(new Error(errorMessage));

            const request = { query: { id: 'user-id' } } as any;
            const response = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            await usuarioController.excluirCadastroUsuario(request, response);

            expect(usuarioServiceMock.excluirUsuario).toHaveBeenCalledWith('user-id');
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    });

    describe('entrarUsuario', () => {
        it('deve retornar status 200 e o token ao entrar com sucesso', async () => {
            const token = 'token-de-acesso';
            usuarioServiceMock.entrarUsuario.mockResolvedValueOnce(token);

            const request = { body: {} } as Request;
            const response = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            await usuarioController.entrarUsuario(request, response);

            expect(usuarioServiceMock.entrarUsuario).toHaveBeenCalled();
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({ token });
        });

        it('deve retornar status 401 e a mensagem de erro ao ocorrer um erro ao entrar', async () => {
            const errorMessage = 'Erro ao entrar';
            usuarioServiceMock.entrarUsuario.mockRejectedValueOnce(new Error(errorMessage));

            const request = { body: {} } as Request;
            const response = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

            await usuarioController.entrarUsuario(request, response);

            expect(usuarioServiceMock.entrarUsuario).toHaveBeenCalled();
            expect(response.status).toHaveBeenCalledWith(401);
            expect(response.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    });
});