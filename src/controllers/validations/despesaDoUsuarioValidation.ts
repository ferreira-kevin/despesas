import { header } from "express-validator";
import DespesaModel from "../../infrastructure/database/models/despesaModel";

export default [
    header('idUsuario',"Despesa fora do escopo do usuário.").custom(async (idUsuario, { req }) => {
        const despesa =  await DespesaModel.findByPk(req.params.id);
        
        return despesa && despesa.idUsuario === idUsuario;
    })
]