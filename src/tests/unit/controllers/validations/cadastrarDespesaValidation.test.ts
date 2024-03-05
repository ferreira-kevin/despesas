import { validationResult } from "express-validator";
import cadastrarDespesaValidation from "../../../../controllers/validations/cadastrarDespesaValidation";

describe('Deve ', () => {
    it('deve retornar erro de campo idUsuario inválido', async () => {
        let data = new Date();
		data.setDate(data.getDate() - 3);

		const req = { body: {
            idUsuario: '1234567',
            descricao: 'Está é uma descrição válida',
            valor: '10.95',
            data: data.toISOString() }};

        await Promise.all(cadastrarDespesaValidation.map(validation => validation.run(req)));
		const errors = validationResult(req);

		expect(errors.array()).toHaveLength(1);
		expect(errors.array()[0]).toHaveProperty("path","idUsuario");
	})

    it('deve retornar erro de campo descricao inválido', async () => {
        let data = new Date();
		data.setDate(data.getDate() - 3);

		const req = { body: {
            idUsuario: '4d4fda72-656e-4b58-b9ef-52e0f76240a8',
            descricao: 'Está é uma descrição maior que o permitido. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula dolor vitae lacus ultricies, quis consectetur risus pharetra. Sed scelerisque lacinia enim, quis ullamcorper purus consectetur nec.',
            valor: '10.95',
            data: data.toISOString() }};

        await Promise.all(cadastrarDespesaValidation.map(validation => validation.run(req)));
		const errors = validationResult(req);

		expect(errors.array()).toHaveLength(1);
		expect(errors.array()[0]).toHaveProperty("path","descricao");
	})

    it('deve retornar erro de campo valor inválido', async () => {
        let data = new Date();
		data.setDate(data.getDate() - 3);

		const req = { body: {
            idUsuario: '4d4fda72-656e-4b58-b9ef-52e0f76240a8',
            descricao: 'Está é uma descrição válida',
            valor: '-10.95',
            data: data.toISOString() }};

        await Promise.all(cadastrarDespesaValidation.map(validation => validation.run(req)));
		const errors = validationResult(req);

		expect(errors.array()).toHaveLength(1);
		expect(errors.array()[0]).toHaveProperty("path","valor");
	})

	it('deve retornar erro de campo data inválido', async () => {
        let data = new Date();
		data.setDate(data.getDate() + 3);

		const req = { body: {
            idUsuario: '4d4fda72-656e-4b58-b9ef-52e0f76240a8',
            descricao: 'Está é uma descrição válida',
            valor: '10.95',
            data: data.toISOString() }};

        await Promise.all(cadastrarDespesaValidation.map(validation => validation.run(req)));
		const errors = validationResult(req);

		expect(errors.array()).toHaveLength(1);
		expect(errors.array()[0]).toHaveProperty("path","data");
	})
});