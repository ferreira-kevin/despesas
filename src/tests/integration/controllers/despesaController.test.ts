import request from "supertest";
import { app } from "../../../app";
import uuid from "../../../utils/uuid";
import { Helpers } from "../../utils/helpers";
import { DespesaDto } from "../../../controllers/dtos/despesaDto";
import UsuarioModel from "../../../infrastructure/database/models/usuarioModel";

var token: String;

describe('Usuário Controller ', () => {
	beforeAll(async () => {
		jest.clearAllMocks();
		process.env.APP_SECRET = 'test-secret-f47ac10b-58cc-4372-a567-0e02b2c3d479';
		token = await Helpers.gerarTokenValido("6d3143ab-390e-4c1f-9bd5-e6fc71b2d7f7");

        // await UsuarioModel.create({
        //     id: "6d3143ab-390e-4c1f-9bd5-e6fc71b2d7f7",
        //     email: `fulano.${uuid()}@gmail.com`,
        //     passwordHash: "123",
        //     nome: "Fulano"
        // });
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
        const dateIgnore = (received: Date, expected: Date) => {
            return true;
          };

          const expectedData = {
            id: '6d3143ab-390e-4c1f-9bd5-e6fc71b2d7f7',
            descricao: 'Despesa 1',
            valor: 100.00,
            idUsuario: '6d3143ab-390e-4c1f-9bd5-e6fc71b2d7f7'
        };
        expect(response.data).toMatchObject({ expectedData, date: dateIgnore });
    });

    it("deve atualizar uma despesa com sucesso", async () => {
        const idDespesa = "7a87e50d-c3bb-45f3-a8b0-2fd45fc4f4a2";
        const response = await request(app)
            .put(`/despesas/${idDespesa}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ descricao: "Nova descrição", valor: 2999.99, data: new Date() } as DespesaDto);

        expect(response.message).toBeUndefined();
        expect(response.status).toBe(200);
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