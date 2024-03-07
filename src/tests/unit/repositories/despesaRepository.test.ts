import DespesaModel from "../../../infrastructure/database/models/despesaModel";
import { DespesaRepository } from "../../../repositories/despesaRepository";

jest.mock('../../../infrastructure/database/models/despesaModel', () => ({
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
}));

const despesaRepository = new DespesaRepository();

describe('DespesaRepository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Deve criar uma despesa', async () => {
        const despesaMock = {
            id: '123',
            idUsuario: '123',
            descricao: 'Descrição da despesa',
            data: new Date(),
            valor: 100
        };

        await despesaRepository.criar(despesaMock as DespesaModel);

        expect(DespesaModel.create).toHaveBeenCalledWith(despesaMock);
    });

    it('Deve atualizar uma despesa', async () => {
        const despesaMock = {
            id: '123',
            idUsuario: '123',
            descricao: 'Descrição da despesa',
            data: new Date(),
            valor: 100
        };

        await despesaRepository.atualizar(despesaMock as DespesaModel);

        expect(DespesaModel.update).toHaveBeenCalledWith(despesaMock, {where: { id: despesaMock.id}});
    });

    it('Deve deletar uma despesa', async () => {
        const idDespesa = '123';
        await despesaRepository.deletar(idDespesa);

        expect(DespesaModel.destroy).toHaveBeenCalledWith({ where: { id: idDespesa }});
    });

    it('Deve buscar uma despesa por id', async () => {
        const idDespesa = '123';
        await despesaRepository.buscarPorId(idDespesa);

        expect(DespesaModel.findOne).toHaveBeenCalledWith({ where: { id: idDespesa }});
    });

    it('Deve listar despesas por id do usuário', async () => {
        const idUsuario = '456';
        await despesaRepository.listarPorIdUsuario(idUsuario);

        expect(DespesaModel.findAll).toHaveBeenCalledWith({ where: { idUsuario }});
    });
});
