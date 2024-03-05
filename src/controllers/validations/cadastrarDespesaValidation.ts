import { body } from "express-validator";

export default [
    body('idUsuario', 'Deve informar um usuário válido.').isUUID(),
    body('descricao', 'A descrição não pode estar vazia e deve ter no máximo 191 caracteres.').isString().notEmpty().isLength({ max: 191 }),
    body('valor', 'O valor da despesa deve ser um número positivo.').isDecimal().isLength({ min: 0 }),
    body('data', 'Deve ser informada uma data válida anterior a data atual.').isDate().isBefore(new Date().toDateString())
]