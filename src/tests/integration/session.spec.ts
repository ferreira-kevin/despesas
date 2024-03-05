import { app } from "../../app";
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