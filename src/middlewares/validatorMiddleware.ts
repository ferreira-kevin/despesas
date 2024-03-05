import {  Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export default async function (req: Request, res: Response, next: NextFunction) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
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