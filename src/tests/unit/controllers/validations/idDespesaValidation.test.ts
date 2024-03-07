import { validationResult } from 'express-validator';
import DespesaModel from '../../../../infrastructure/database/models/despesaModel';
import idDespesaValidation from '../../../../controllers/validations/idDespesaValidation';

jest.mock('../../../../infrastructure/database/models/despesaModel', () => ({
    findByPk: jest.fn(),
}));

describe('Validações de Despesa', () => {
    it('deve retornar erro se o ID não for informado', async () => {
        const req = { query: { id: '' }, headers: { idUsuario: 'id_usuario' } };
        await Promise.all(idDespesaValidation.map(validation => validation.run(req)));
        const errors = validationResult(req);

        expect(errors.array()).toHaveLength(2);
    });

    it('deve retornar erro se o ID não for um UUID válido', async () => {
        const req = { query: { id: 'id_invalido' } };
        await Promise.all(idDespesaValidation.map(validation => validation.run(req)));
        const errors = validationResult(req);

        expect(errors.array()).toHaveLength(2);
    });
});
