import { body } from "express-validator";

export default [
    body('email', 'E-mail deve ser informado.').exists(),
    body('email', 'O e-mail informado é inválido.').isEmail(),
    body('password', 'A senha deve conter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.').exists().isStrongPassword(),
]