import request from "supertest";
import { UsuarioDto } from "../../../controllers/dtos/usuarioDto";
import { app } from "../../../app";
import bcrypt from 'bcrypt';
import { Utils } from "../../../shared/utils";

describe('Usuário Controller ', () => {
	beforeAll(async () => {
		jest.clearAllMocks();
		process.env.APP_SECRET = 'test-secret-f47ac10b-58cc-4372-a567-0e02b2c3d479';
	});

    it("deve cadastrar usuário com sucesso", async () => {
        const response = await request(app)
		.post("/usuarios")
		.send({ nome: "Fulano", email: `fulano.${Utils.uuid()}@gmail.com`, password: "fse5G%gedf9GFgsd2" } as UsuarioDto);

		expect(response.message).toBeUndefined();
		expect(response.status).toBe(201);
	});

    it("deve cadastrar usuário com sucesso e retornar um token válido", async () => {
        const email = `fulano.${Utils.uuid()}@gmail.com`;
		
		const responseCadastro = await request(app)
		.post("/usuarios")
		.send({ nome: "Fulano", email: email, password: "fse5G%gedf9GFgsd2" } as UsuarioDto);

		expect(responseCadastro.message).toBeUndefined();
		expect(responseCadastro.status).toBe(201);

		const response = await request(app)
		.post("/sessions")
		.send({email: email, password: "fse5G%gedf9GFgsd2" } as UsuarioDto);

		expect(response.message).toBeUndefined();
		expect(response.status).toBe(200);
	});
});