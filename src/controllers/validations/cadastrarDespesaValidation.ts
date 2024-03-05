import { body } from "express-validator";

export default [
    // body('idUsuario', 'Deve informar um usuário válido.').exists().notEmpty().isUUID(4),
    body('descricao', 'A descrição não pode estar vazia e deve ter no máximo 191 caracteres.').isString().notEmpty().isLength({ max: 191 }),
    body('valor', 'O valor da despesa deve ser um número positivo.').isFloat({ min: 0 }),
    body('data', 'Deve ser informada uma data válida anterior a data atual.').isISO8601().toDate().custom(data => new Date(data) <= new Date())
]