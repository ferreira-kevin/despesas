import { validationResult } from 'express-validator';
import cadastrarUsuarioValidation from '../../../../controllers/validations/cadastrarUsuarioValidation';

describe('Validações de Cadastro de Usuário', () => {
    it('deve retornar erro se o e-mail não for informado', async () => {
        const req = { body: { nome: 'Teste', password: 'Senha123$' } };
        await Promise.all(cadastrarUsuarioValidation.map(validation => validation.run(req)));
        const errors = validationResult(req);

        expect(errors.array()).toHaveLength(2);
        expect(errors.array()[0]).toHaveProperty('path', 'email');
    });

    it('deve retornar erro se o e-mail informado for inválido', async () => {
        const req = { body: { email: 'emailinvalido', nome: 'Teste', password: 'Senha123$' } };
        await Promise.all(cadastrarUsuarioValidation.map(validation => validation.run(req)));
        const errors = validationResult(req);

        expect(errors.array()).toHaveLength(1);
        expect(errors.array()[0]).toHaveProperty('path', 'email');
    });

    it('deve retornar erro se o nome não for informado', async () => {
        const req = { body: { email: 'teste@teste.com', nome: '', password: 'Senha123$' } };
        await Promise.all(cadastrarUsuarioValidation.map(validation => validation.run(req)));
        const errors = validationResult(req);

        expect(errors.array()).toHaveLength(1);
        expect(errors.array()[0]).toHaveProperty('path', 'nome');
    });

    it('deve retornar erro se a senha não atender aos requisitos mínimos', async () => {
        const req = { body: { email: 'teste@teste.com', nome: 'Teste', password: 'senhafraca' } };
        await Promise.all(cadastrarUsuarioValidation.map(validation => validation.run(req)));
        const errors = validationResult(req);

        expect(errors.array()).toHaveLength(1);
        expect(errors.array()[0]).toHaveProperty('path', 'password');
    });
});
