import jwt from 'jsonwebtoken';

export class Helpers {
	static isGuid(str: string | null): boolean {
		if (!str) return false;

		const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
		return guidRegex.test(str);
	}

	static gerarTokenValido(id: string) {
		return jwt.sign({ id }, process.env.APP_SECRET, {
			expiresIn: 3600
		});
	}
}