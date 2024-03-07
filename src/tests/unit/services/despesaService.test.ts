import { DespesaDto } from '../../../controllers/dtos/despesaDto';
import { IEmailAgent } from '../../../infrastructure/agents/IEmailAgent';
import DespesaModel from '../../../infrastructure/database/models/despesaModel';
import { IDespesaRepository } from '../../../repositories/interfaces/IDespesaRepository';
import { IUsuarioRepository } from '../../../repositories/interfaces/IUsuarioRepository';
import { DespesaService } from '../../../services/despesaService';

const mockDespesaRepository = {
    criar: jest.fn(),
    atualizar: jest.fn(),
    buscarPorId: jest.fn(),
    listarPorIdUsuario: jest.fn(),
    deletar: jest.fn()
};

const mockUsuarioRepository = {
    buscarPorId: jest.fn()
};

const mockEmailAgent = {
    sendMail: jest.fn()
};

const despesaService = new DespesaService(
    mockDespesaRepository as IDespesaRepository,
    mockUsuarioRepository as unknown as IUsuarioRepository,
    mockEmailAgent as IEmailAgent
);

describe('DespesaService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('cadastrarDespesa', () => {
        it('deve cadastrar uma despesa e enviar um email', async () => {
            const despesaDto: DespesaDto = {
                id: '',
                idUsuario: '123',
                descricao: 'Descrição da despesa',
                data: new Date(),
                valor: 100
            };

            const usuario = { id: '123', email: 'teste@teste.com', nome: 'Teste' };

            mockUsuarioRepository.buscarPorId.mockResolvedValue(usuario);

            await despesaService.cadastrarDespesa(despesaDto);

            expect(mockDespesaRepository.criar).toHaveBeenCalledTimes(1);
            expect(mockEmailAgent.sendMail).toHaveBeenCalledTimes(1);
        });

        it('deve lançar um erro se o usuário não existir', async () => {
            const despesaDto: DespesaDto = {
                idUsuario: '123',
                descricao: 'Descrição da despesa',
                data: new Date(),
                valor: 100
            };

            mockUsuarioRepository.buscarPorId.mockResolvedValue(undefined);

            await expect(despesaService.cadastrarDespesa(despesaDto)).rejects.toThrow('Usuário inexistente.');
        });
    });

    describe('obterDespesa', () => {
        it('Deve retornar uma despesa existente', async () => {
            const despesaExistente = new DespesaModel();
            mockDespesaRepository.buscarPorId.mockResolvedValue(despesaExistente);
    
            const idDespesa = '123';
    
            const result = await despesaService.obterDespesa(idDespesa);
    
            expect(mockDespesaRepository.buscarPorId).toHaveBeenCalledWith(idDespesa);
            expect(result).toEqual(despesaExistente);
        });
    
        it('Deve lançar um erro se a despesa não for encontrada', async () => {
            mockDespesaRepository.buscarPorId.mockResolvedValue(undefined);
    
            const idDespesa = '123';
    
            await expect(despesaService.obterDespesa(idDespesa)).rejects.toThrow('Despesa não encontrada.');
            expect(mockDespesaRepository.buscarPorId).toHaveBeenCalledWith(idDespesa);
        });
    });

    describe('listarDespesas', () => {
        it('Deve retornar uma lista de despesas existente', async () => {
            const despesasExistentes = [
                new DespesaModel(),
                new DespesaModel(),
                new DespesaModel(),
            ];
            mockDespesaRepository.listarPorIdUsuario.mockResolvedValue(despesasExistentes);
    
            const idUsuario = '123';
    
            const result = await despesaService.listarDespesas(idUsuario);
    
            expect(mockDespesaRepository.listarPorIdUsuario).toHaveBeenCalledWith(idUsuario);
            expect(result).toEqual(despesasExistentes);
        });
    
        it('Deve lançar um erro se nenhuma despesa for encontrada', async () => {
            mockDespesaRepository.listarPorIdUsuario.mockResolvedValue(undefined);
    
            const idUsuario = '123';
    
            await expect(despesaService.listarDespesas(idUsuario)).rejects.toThrow('Despesa não encontrada.');
            expect(mockDespesaRepository.listarPorIdUsuario).toHaveBeenCalledWith(idUsuario);
        });
    });

    describe('excluirDespesa', () => {
        it('Deve excluir a despesa com sucesso', async () => {
            const idDespesa = '123';
    
            await despesaService.excluirDespesa(idDespesa);
    
            expect(mockDespesaRepository.deletar).toHaveBeenCalledWith(idDespesa);
        });
    });
});
