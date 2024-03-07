import { header, param, query } from "express-validator";
import DespesaModel from "../../infrastructure/database/models/despesaModel";

export default [
    param('id', 'Um ID válido deve ser informado.').exists().isUUID().custom(async (id, { req }) => {
        const despesa =  await DespesaModel.findByPk(id);
        
        return despesa && despesa.idUsuario === req.headers.idUsuario;
    })
]