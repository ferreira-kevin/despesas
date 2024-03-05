import {  Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export default async function (req: Request, res: Response, next: NextFunction) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const headerErrors = errors.array().filter(error => error.location ===  "headers");

		if (headerErrors.length > 0) {
			return res.status(401).json({ error: 'Ação não autorizada.', errors: headerErrors });
		}

		return res.status(400).json(formatValidationError(errors.array()));
	}

	next();
}

function formatValidationError(errors: any[]) {
	const formattedErrors: any = {};
	errors.forEach(error => {
		const field = error.path;
		const message = error.msg;
		formattedErrors[field] = message;
	});
	return formattedErrors;
}