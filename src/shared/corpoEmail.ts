import DespesaModel from "../infrastructure/database/models/despesaModel";
import { Utils } from "./utils";

export class CorpoEmail {
    static DespesaCadastrada(despesaModel: DespesaModel, nomeUsuario: string): string {
        return `<h2><strong>Nova despesa cadastrada em seu nome</strong></h2>

        <p>Ol&aacute; ${nomeUsuario}, uma nova despesa foi cadasrtrada em seu nome.</p>
        
        <p><span style="font-size:16px"><strong>Informa&ccedil;&otilde;es da despesa</strong></span></p>
        
        <p>Data da despesa: ${Utils.formatarData(despesaModel.data)}<br />
        Identifica&ccedil;&atilde;o da despesa:&nbsp; ${despesaModel.id}<br />
        Descri&ccedil;&atilde;o:&nbsp; ${despesaModel.descricao}<br />
        Valor: ${Utils.formatarMoeda(despesaModel.valor)}</p>
        
        <p>&nbsp;</p>
        
        <address><span style="font-family:times new roman,times,serif">Este &eacute; um e-mail autom&aacute;tico.</span></address>
        `;
    }
}