import { NextFunction, Request, Response } from "express";
import authMiddleware from "../../../middlewares/authMiddleware";
import { Helpers } from "../../utils/helpers";

describe('Autentication Middleware', () => {
	const mockRequest = { headers: {}} as Request;
	const mockResponse = {
		status: jest.fn(() => mockResponse),
		json: jest.fn(),
	} as unknown as Response;
	const mockNext = jest.fn() as NextFunction;

	beforeAll(() => {
		process.env.APP_SECRET = 'test-secret-f47ac10b-58cc-4372-a567-0e02b2c3d479';
  });

	beforeEach(() => {
    jest.clearAllMocks();
  });
	
	it('deve retornar 401 se o token não for fornecido', async () => {
    await authMiddleware(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Token de autenticação não fornecido."
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('deve chamar o next() se o token for fornecido e for válido', async () => {
		const token = await Helpers.gerarTokenValido("6d3143ab-390e-4c1f-9bd5-e6fc71b2d7f7");

    mockRequest.headers = { authorization: `Bearer ${token}` };

    await authMiddleware(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });

  it('deve retornar 401 se o token for fornecido mas for inválido', async () => {
    const token = 'token_invalido';
    mockRequest.headers = { authorization: `Bearer ${token}` };

    await authMiddleware(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Token de autenticação inválido."
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
