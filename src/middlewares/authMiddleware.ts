import { Request, Response, NextFunction } from "express"
import { promisify } from 'util';
import jwt from 'jsonwebtoken';

export default async function (req: Request, res: Response, next: NextFunction) {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res.status(401).json({message: "Token de autenticação não fornecido."})
	}

	try {
		const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);
		req.headers.idUsuario = decoded.id;
		
		next();
	} catch (error) {
		return res.status(401).json({ message: "Token de autenticação inválido."})
	}
}
