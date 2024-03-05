import request from "supertest";
import { app } from "../../../../app";
import { Helpers } from "../../../utils/helpers";

var token: string;

describe('Validação Cadastro Usuário ', () => {
	beforeAll(async () => {
		jest.clearAllMocks();
		process.env.APP_SECRET = 'test-secret-f47ac10b-58cc-4372-a567-0e02b2c3d479';
		token = await Helpers.gerarTokenValido("6d3143ab-390e-4c1f-9bd5-e6fc71b2d7f7");
	});

	it("deve ter acesso negado por não passar um token válido", async () => {
		const response = await request(app)
		.delete("/usuarios")
		.set("Authorization", `Bearer token_invalido`)
		.send({});

		expect(response.status).toBe(401);
	});

	it("deve retornar erro de campos não preenchidos", async () => {
		const response = await request(app)
		.post("/usuarios")
		.set("Authorization", `Bearer ${token}`)
		.send({});

		expect(response.status).toBe(400);
		expect(response.text).toContain("email");
		expect(response.text).toContain("nome");
		expect(response.text).toContain("password");
	});

	it("deve retornar erro de campos inválidos", async () => {
		const response = await request(app)
		.post("/usuarios")
		.set("Authorization", `Bearer ${token}`)
		.send({ email: 'invalid-email', nome: '', password: '1234' });

		expect(response.status).toBe(400);
		expect(response.text).toContain("email");
		expect(response.text).toContain("nome");
		expect(response.text).toContain("password");
	});

	it("deve retornar erro de campo email inválido", async () => {
		const response = await request(app)
		.post("/usuarios")
		.set("Authorization", `Bearer ${token}`)
		.send({ email: 'invalid-email', nome: 'Fulano', password: 'ffskd@3(Fd0as!ds' });

		expect(response.status).toBe(400);
		expect(response.text).toContain("email");
		expect(response.text).not.toContain("nome");
		expect(response.text).not.toContain("password");
	});

	it("deve retornar erro de campo nome inválido", async () => {
		const response = await request(app)
		.post("/usuarios")
		.set("Authorization", `Bearer ${token}`)
		.send({ email: 'fulano@gmail.com', nome: '', password: 'ffskd@3(Fd0as!ds' });

		expect(response.status).toBe(400);
		expect(response.text).not.toContain("email");
		expect(response.text).toContain("nome");
		expect(response.text).not.toContain("password");
	});

	it("deve retornar erro de campo password inválido", async () => {
		const response = await request(app)
		.post("/usuarios")
		.set("Authorization", `Bearer ${token}`)
		.send({ email: 'fulano@gmail.com', nome: 'Fulano', password: '0000aaaa' });

		expect(response.status).toBe(400);
		expect(response.text).not.toContain("email");
		expect(response.text).not.toContain("nome");
		expect(response.text).toContain("password");
	});
});