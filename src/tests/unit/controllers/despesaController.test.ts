
import { DespesaController } from '../../../controllers/despesaController';
import { IDespesaService } from '../../../services/interfaces/IDespesaService';

const despesaServiceMock: jest.Mocked<IDespesaService> = {
    cadastrarDespesa: jest.fn(),
    atualizarDespesa: jest.fn(),
    obterDespesa: jest.fn(),
    listarDespesas: jest.fn(),
    excluirDespesa: jest.fn(),
};

const despesaController = new DespesaController(despesaServiceMock);

describe('DespesaController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('cadastrarDespesa', () => {
      it('Deve cadastrar uma despesa com sucesso', async () => {
          const mockRequest: any = { headers: { idUsuario: '123' }, body: { descricao: 'Nova Despesa' } };
          const mockResponse: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
          await despesaController.cadastrarDespesa(mockRequest, mockResponse);
    
          expect(mockResponse.status).toHaveBeenCalledWith(201);
          expect(mockResponse.send).toHaveBeenCalled();
          expect(despesaServiceMock.cadastrarDespesa).toHaveBeenCalledWith({ idUsuario: '123', descricao: 'Nova Despesa' });
        });
    
        it('Deve lidar com erros ao cadastrar uma despesa', async () => {
          const mockRequest: any = { headers: { idUsuario: '123' }, body: { descricao: 'Nova Despesa' } };
          const mockResponse: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
          despesaServiceMock.cadastrarDespesa.mockRejectedValue(new Error('Erro ao cadastrar despesa'));
    
          await despesaController.cadastrarDespesa(mockRequest, mockResponse);
    
          expect(mockResponse.status).toHaveBeenCalledWith(400);
          expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao cadastrar despesa' });
        });
      });
    
    describe('atualizarDespesa', () => {
        it('Deve atualizar uma despesa com sucesso', async () => {
          const mockRequest: any = { headers: { idUsuario: '123' }, body: { id: '123', descricao: 'Nova descrição' } };
          const mockResponse: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
          await despesaController.atualizarDespesa(mockRequest, mockResponse);
    
          expect(mockResponse.status).toHaveBeenCalledWith(201);
          expect(mockResponse.send).toHaveBeenCalled();
          expect(despesaServiceMock.atualizarDespesa).toHaveBeenCalledWith({ idUsuario: '123', id: '123', descricao: 'Nova descrição' });
        });
    
        it('Deve lidar com erros ao atualizar uma despesa', async () => {
          const mockRequest: any = { headers: { idUsuario: '123' }, body: { id: '123', descricao: 'Nova descrição' } };
          const mockResponse: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
          despesaServiceMock.atualizarDespesa = jest.fn().mockRejectedValue(new Error('Erro ao atualizar despesa'));
    
          await despesaController.atualizarDespesa(mockRequest, mockResponse);
    
          expect(mockResponse.status).toHaveBeenCalledWith(400);
          expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao atualizar despesa' });
        });
      });

    describe('obterDespesa', () => {
        it('Deve obter uma despesa com sucesso', async () => {
          const mockRequest: any = { params: { id: '123' } };
          const mockResponse: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
          const mockDespesa = { id: '123', descricao: 'Despesa 1' };
    
          despesaServiceMock.obterDespesa = jest.fn().mockResolvedValue(mockDespesa);
    
          await despesaController.obterDespesa(mockRequest, mockResponse);
    
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.json).toHaveBeenCalledWith(mockDespesa);
          expect(despesaServiceMock.obterDespesa).toHaveBeenCalledWith('123');
        });
    
        it('Deve lidar com erros ao obter uma despesa', async () => {
          const mockRequest: any = { params: { id: '123' } };
          const mockResponse: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
          despesaServiceMock.obterDespesa = jest.fn().mockRejectedValue(new Error('Erro ao obter despesa'));
    
          await despesaController.obterDespesa(mockRequest, mockResponse);
    
          expect(mockResponse.status).toHaveBeenCalledWith(400);
          expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao obter despesa' });
        });
      });
    

    describe('listarDespesas', () => {
        it('Deve listar despesas com sucesso', async () => {
          const mockRequest: any = { headers: { idUsuario: '123' } };
          const mockResponse: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
          const mockDespesas = [{ id: '1', descricao: 'Despesa 1' }, { id: '2', descricao: 'Despesa 2' }];
    
          despesaServiceMock.listarDespesas = jest.fn().mockResolvedValue(mockDespesas);
    
          await despesaController.listarDespesas(mockRequest, mockResponse);
    
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.json).toHaveBeenCalledWith(mockDespesas);
          expect(despesaServiceMock.listarDespesas).toHaveBeenCalledWith('123');
        });
    
        it('Deve lidar com erros ao listar despesas', async () => {
          const mockRequest: any = { headers: { idUsuario: '123' } };
          const mockResponse: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
          despesaServiceMock.listarDespesas = jest.fn().mockRejectedValue(new Error('Erro ao listar despesas'));
    
          await despesaController.listarDespesas(mockRequest, mockResponse);
    
          expect(mockResponse.status).toHaveBeenCalledWith(400);
          expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao listar despesas' });
        });
      });

    describe('excluirDespesa', () => {
        it('Deve excluir uma despesa com sucesso', async () => {
          const mockRequest: any = { params: { id: '123' } };
          const mockResponse: any = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    
          await despesaController.excluirDespesa(mockRequest, mockResponse);
    
          expect(mockResponse.status).toHaveBeenCalledWith(204);
          expect(mockResponse.send).toHaveBeenCalled();
          expect(despesaServiceMock.excluirDespesa).toHaveBeenCalledWith('123');
        });
    
        it('Deve lidar com erros ao excluir uma despesa', async () => {
          const mockRequest: any = { params: { id: '123' } };
          const mockResponse: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
          despesaServiceMock.excluirDespesa = jest.fn().mockRejectedValue(new Error('Erro ao excluir despesa'));
    
          await despesaController.excluirDespesa(mockRequest, mockResponse);
    
          expect(mockResponse.status).toHaveBeenCalledWith(400);
          expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao excluir despesa' });
        });
      });
});
