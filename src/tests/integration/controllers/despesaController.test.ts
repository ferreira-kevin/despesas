import request from "supertest";
import { app } from "../../../app";
import { Helpers } from "../../utils/helpers";
import { DespesaDto } from "../../../controllers/dtos/despesaDto";

jest.mock('../../../infrastructure/agents/emailAgent');

var token: String;

describe('Usuário Controller ', () => {
	beforeAll(async () => {
		jest.clearAllMocks();
		process.env.APP_SECRET = 'test-secret-f47ac10b-58cc-4372-a567-0e02b2c3d479';
		token = await Helpers.gerarTokenValido("6d3143ab-390e-4c1f-9bd5-e6fc71b2d7f7");
	});

    it("deve cadastrar despesa com sucesso", async () => {
        const response = await request(app)
		.post("/despesas")
		.set("Authorization", `Bearer ${token}`)
		.send({ descricao: "Testes de despesa", idUsuario: "6d3143ab-390e-4c1f-9bd5-e6fc71b2d7f7", valor: 1999.99, data: new Date() } as DespesaDto);

		expect(response.message).toBeUndefined();
		expect(response.status).toBe(201);
	});

    it("deve obter uma despesa com sucesso", async () => {
        const idDespesa = "6d3143ab-390e-4c1f-9bd5-e6fc71b2d7f7";
        const response = await request(app)
            .get(`/despesas/${idDespesa}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.message).toBeUndefined();
        expect(response.status).toBe(200);

        const despesa = response.body as DespesaDto;
        expect(despesa.descricao).toEqual('Despesa 1');
        expect(despesa.valor).toEqual(100);
        expect(despesa.idUsuario).toEqual('6d3143ab-390e-4c1f-9bd5-e6fc71b2d7f7');
        expect(despesa.id).toEqual('6d3143ab-390e-4c1f-9bd5-e6fc71b2d7f7');
    });

    it("deve excluir uma despesa com sucesso", async () => {
        const idDespesa = "8c527e2a-5a84-4e78-b3e3-1e107f39a3f8";
        const response = await request(app)
            .delete(`/despesas/${idDespesa}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.message).toBeUndefined();
        expect(response.status).toBe(204);
    });
});