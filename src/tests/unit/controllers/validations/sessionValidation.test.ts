import { validationResult } from 'express-validator';
import sessionValidation from '../../../../controllers/validations/sessionValidation';

describe('Validações de Cadastro de Usuário', () => {
    it('deve retornar erro se o e-mail não for informado', async () => {
        const req = { body: { password: 'Senha123$' } };
        await Promise.all(sessionValidation.map(validation => validation.run(req)));
        const errors = validationResult(req);

        expect(errors.array()).toHaveLength(2);
        expect(errors.array()[0]).toHaveProperty('path', 'email');
    });

    it('deve retornar erro se o e-mail informado for inválido', async () => {
        const req = { body: { email: 'emailinvalido', password: 'Senha123$' } };
        await Promise.all(sessionValidation.map(validation => validation.run(req)));
        const errors = validationResult(req);

        expect(errors.array()).toHaveLength(1);
        expect(errors.array()[0]).toHaveProperty('path', 'email');
    });

    it('deve retornar erro se a senha não atender aos requisitos mínimos', async () => {
        const req = { body: { email: 'teste@teste.com', password: 'senhafraca' } };
        await Promise.all(sessionValidation.map(validation => validation.run(req)));
        const errors = validationResult(req);

        expect(errors.array()).toHaveLength(1);
        expect(errors.array()[0]).toHaveProperty('path', 'password');
    });

    it('não deve retornar erro se a senha atender aos requisitos mínimos e o E-mail for válido', async () => {
        const req = { body: { email: 'teste@teste.com', password: 'Senha123$' } };
        await Promise.all(sessionValidation.map(validation => validation.run(req)));
        const errors = validationResult(req);

        expect(errors.array()).toHaveLength(0);
    });
});
