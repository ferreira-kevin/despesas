import { Usuario } from "../../../domain/usuario";
import { Helpers } from "../../utils/helpers";
import { promisify } from 'util';
import jwt from 'jsonwebtoken';

describe('Autentication', () => {
	beforeAll(() => {
		process.env.APP_SECRET = 'test-secret-f47ac10b-58cc-4372-a567-0e02b2c3d479';
  	});
	
	it("deve criar um usuário", async () => {

		const usuario = new Usuario("Fulano", "fulano@gmail.com", "fse5G%gedf9GFgsd2");

		expect(usuario.nome).toBe("Fulano");
		expect(usuario.email).toBe("fulano@gmail.com");
		expect(usuario.passwordHash).toBe("fse5G%gedf9GFgsd2");
		expect(usuario.criadoEm).toBeDefined();
		expect(usuario.alteradoEm).toBeDefined();
		expect(Helpers.isGuid(usuario.id)).toBe(true);
	});

	it("deve atualizar os dados do usuário", async () => {
		const usuario = new Usuario("Fulano", "fulano@gmail.com", "fse5G%gedf9GFgsd2");
		usuario.alterarUsuario("Fulano Beltrano", "fulano.beltrano@gmail.com", "gr0$d02;SF20DFadf0");

		expect(usuario.nome).toBe("Fulano Beltrano");
		expect(usuario.email).toBe("fulano.beltrano@gmail.com");
		expect(usuario.passwordHash).toBe("gr0$d02;SF20DFadf0");
		expect(usuario.criadoEm).toBeDefined();
		expect(usuario.alteradoEm).toBeDefined();
		expect(Helpers.isGuid(usuario.id)).toBe(true);
	});

	it("deve retornar `true` quando a senha descriptografada corresponde a senha originalmente criptografada", async () => {
		const usuario = new Usuario("Fulano", "fulano@gmail.com", await Usuario.encriptarPassword("fse5G%gedf9GFgsd2"));
		const resultado = await usuario.checkPassword("fse5G%gedf9GFgsd2");

		expect(resultado).toBe(true);
	});

	it("deve retornar `false` quando a senha descriptografada NÃO corresponde a senha originalmente criptografada", async () => {
		const usuario = new Usuario("Fulano", "fulano@gmail.com", await Usuario.encriptarPassword("fse5G%gedf9GFgsd2"));
		const resultado = await usuario.checkPassword("p9fjsd-fsd@EFwdf");

		expect(resultado).toBe(false);
	});

	it("deve gerar um token válido com id do usuário", async () => {
		const usuario = new Usuario("Fulano", "fulano@gmail.com", await Usuario.encriptarPassword("fse5G%gedf9GFgsd2"));
		const token = await usuario.generateToken();
		const resultado = await promisify(jwt.verify)(token, process.env.APP_SECRET);

		expect(resultado.id).toEqual(usuario.id);
	});

	it("deve gerar um token válido com id do usuário", async () => {
		const usuario = new Usuario("Fulano", "fulano@gmail.com", await Usuario.encriptarPassword("fse5G%gedf9GFgsd2"));
		const token = await usuario.generateToken();
		const resultado = await promisify(jwt.verify)(token, process.env.APP_SECRET);

		expect(resultado.id).toEqual(usuario.id);
	});
});
