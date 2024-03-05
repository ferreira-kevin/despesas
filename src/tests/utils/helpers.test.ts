import { Helpers } from "./helpers";

describe('Helpers ', () => {
    it('deve retornar erro ao receber uuid inválido', () => {
		const resultado = Helpers.isGuid('dasdasdas');
		expect(resultado).toBe(false);
	});
});