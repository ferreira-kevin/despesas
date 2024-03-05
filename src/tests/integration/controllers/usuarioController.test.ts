import request from "supertest";
import { UsuarioDto } from "../../../controllers/dtos/usuarioDto";
import { app } from "../../../app";
import UsuarioModel from "../../../infrastructure/database/models/usuarioModel";

var token: string;

describe('Usuário Controller ', () => {
	beforeAll(async () => {
		jest.clearAllMocks();
		process.env.APP_SECRET = 'test-secret-f47ac10b-58cc-4372-a567-0e02b2c3d479';
		const usuario = new UsuarioModel();
		usuario.nome = "Fulano";
		usuario.email = "fulano@gmail.com";
		usuario.passwordHash = await UsuarioModel.encriptarPassword("fse5G%gedf9GFgsd2");
		token = await usuario.generateToken();
	});

    it("deve cadastrar usuário com sucesso", async () => {
        const response = await request(app)
		.post("/usuarios")
		.send({ nome: "Fulano", email: "fulano.0001@gmail.com", password: "fse5G%gedf9GFgsd2" } as UsuarioDto);

		expect(response.message).toBeUndefined();
		expect(response.status).toBe(201);
	});

    // it("deve cadastrar usuário com sucesso e retornar um token válido", async () => {
    //     const response = await request(app)
	// 	.post("/sessions")
	// 	.send({email: "fulano.0001@gmail.com", password: "fse5G%gedf9GFgsd2" } as UsuarioDto);

	// 	expect(response.message).toBeUndefined();
	// 	expect(response.status).toBe(200);

    //     const resultado = await bcrypt.compare("fse5G%gedf9GFgsd2", response.message.token);

    //     expect(response).toBe(true);
	// });

    // it("deve cadastrar usuário com sucesso e retornar um token válido", async () => {
    //     const response = await request(app)
	// 	.post("/sessions")
	// 	.send({email: "fulano@gmail.com", password: "fse5G%gedf9GFgsd2" } as UsuarioDto);

	// 	expect(response.message).toBeUndefined();
	// 	expect(response.status).toBe(200);

    //     const resultado = await bcrypt.compare("fse5G%gedf9GFgsd2", response.message.token);

    //     expect(response).toBe(true);
	// });

});