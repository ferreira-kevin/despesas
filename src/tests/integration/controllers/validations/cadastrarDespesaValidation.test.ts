import request from "supertest";
import { app } from "../../../../app";
import { Helpers } from "../../../utils/helpers";

var token: string;

describe('Validação Cadastro Despesas ', () => {
	beforeAll(async () => {
		jest.clearAllMocks();
		process.env.APP_SECRET = 'test-secret-f47ac10b-58cc-4372-a567-0e02b2c3d479';
		token = await Helpers.gerarTokenValido("6d3143ab-390e-4c1f-9bd5-e6fc71b2d7f7");
	});

	it("deve ter acesso negado por não passar um token válido", async () => {
		const response = await request(app)
		.get("/despesas")
		.set("Authorization", `Bearer token_invalido`)
		.send({});

		expect(response.status).toBe(401);
	});

    it("deve ter acesso negado por não passar um token válido", async () => {
		const response = await request(app)
		.post("/despesas")
		.set("Authorization", `Bearer token_invalido`)
		.send({});

		expect(response.status).toBe(401);
	});

    it("deve ter acesso negado por não passar um token válido", async () => {
		const response = await request(app)
		.delete("/despesas")
		.set("Authorization", `Bearer token_invalido`)
		.send({});

		expect(response.status).toBe(401);
	});

    it("deve ter acesso negado por não passar um token válido", async () => {
		const response = await request(app)
		.put("/despesas")
		.set("Authorization", `Bearer token_invalido`)
		.send({});

		expect(response.status).toBe(401);
	});

	it("deve retornar erro de campo descricao inválido", async () => {
		let data = new Date();
		data.setDate(data.getDate() - 3);

		const response = await request(app)
		.post("/despesas")
		.set("Authorization", `Bearer ${token}`)
		.send({ idUsuario: '4d4fda72-656e-4b58-b9ef-52e0f76240a8', descricao: 'Está é uma descrição maior que o permitido. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula dolor vitae lacus ultricies, quis consectetur risus pharetra. Sed scelerisque lacinia enim, quis ullamcorper purus consectetur nec.', valor: '10.95', data: data.toISOString() });

		expect(response.status).toBe(400);
		expect(response.text).not.toContain("idUsuario");
		expect(response.text).toContain("descricao");
		expect(response.text).not.toContain("valor");
		expect(response.text).not.toContain("data");
	});

	it("deve retornar erro de campo valor inválido", async () => {
		let data = new Date();

		const response = await request(app)
		.post("/despesas")
		.set("Authorization", `Bearer ${token}`)
		.send({ idUsuario: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', descricao: 'Está é uma descrição válida', valor: 'xpto', data: data.toISOString() });

		expect(response.status).toBe(400);
		expect(response.text).not.toContain("idUsuario");
		expect(response.text).not.toContain("descricao");
		expect(response.text).toContain("valor");
		expect(response.text).not.toContain("data");
	});

	it("deve retornar erro de campo data inválido", async () => {
		let data = new Date();
		data.setSeconds(data.getSeconds() + 2);

		const response = await request(app)
		.post("/despesas")
		.set("Authorization", `Bearer ${token}`)
		.send({ idUsuario: '4d4fda72-656e-4b58-b9ef-52e0f76240a8', descricao: 'Está é uma descrição válida', valor: '10.95', data: data.toISOString() });

		expect(response.status).toBe(400);
		expect(response.text).not.toContain("idUsuario");
		expect(response.text).not.toContain("descricao");
		expect(response.text).not.toContain("valor");
		expect(response.text).toContain("data");
	});
});