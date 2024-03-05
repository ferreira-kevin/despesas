import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import UsuarioModel from "../../../infrastructure/database/models/usuarioModel";

describe('Autentication', () => {
	beforeAll(() => {
		process.env.APP_SECRET = 'test-secret-f47ac10b-58cc-4372-a567-0e02b2c3d479';
  	});

	it("deve retornar `true` quando a senha descriptografada corresponde a senha originalmente criptografada", async () => {
		const usuario = new UsuarioModel();
		usuario.nome = "Fulano";
		usuario.email = "fulano@gmail.com";
		usuario.passwordHash = await UsuarioModel.encriptarPassword("fse5G%gedf9GFgsd2");

		const resultado = await usuario.checkPassword("fse5G%gedf9GFgsd2");

		expect(resultado).toBe(true);
	});

	it("deve retornar `false` quando a senha descriptografada NÃO corresponde a senha originalmente criptografada", async () => {
		const usuario = new UsuarioModel();
		usuario.nome = "Fulano";
		usuario.email = "fulano@gmail.com";
		usuario.passwordHash = await UsuarioModel.encriptarPassword("fse5G%gedf9GFgsd2");
		
		const resultado = await usuario.checkPassword("p9fjsd-fsd@EFwdf");

		expect(resultado).toBe(false);
	});

	it("deve gerar um token válido com id do usuário", async () => {
		const usuario = new UsuarioModel();
		usuario.nome = "Fulano";
		usuario.email = "fulano@gmail.com";
		usuario.passwordHash = await UsuarioModel.encriptarPassword("fse5G%gedf9GFgsd2");

		const token = await usuario.generateToken();
		const resultado = await promisify(jwt.verify)(token, process.env.APP_SECRET);

		expect(resultado.id).toEqual(usuario.id);
	});
});
