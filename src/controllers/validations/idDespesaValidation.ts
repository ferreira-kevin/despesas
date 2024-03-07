import { header, param, query } from "express-validator";
import DespesaModel from "../../infrastructure/database/models/despesaModel";

export default [
    param('id', 'Um ID válido deve ser informado.').exists().isUUID(),
    header('idUsuario',"Despesa fora do escopo do usuário.").custom(async (idUsuario, { req }) => {
        const despesa =  await DespesaModel.findByPk(req.params.id);
        
        return despesa && despesa.idUsuario === req.headers.idUsuario;
    })
]