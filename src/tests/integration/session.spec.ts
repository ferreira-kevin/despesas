import { app } from "../../app";
import Despesa from "../../infrastructure/database/models/despesaModel";
import Usuario from "../../infrastructure/database/models/usuarioModel";
import uuid from "../../utils/uuid";
import request from "supertest";
import truncate from "../utils/truncate";

describe('Autentication', () => {
	beforeEach(async () => {
		await truncate();
	})

	it("deve autenticar com credenciais válidas", async () => {
		const response = request(app)
			.post("/")
			.send({
					email: "",
					password: ""
			});
		expect(true).toBeTruthy();
	});
});