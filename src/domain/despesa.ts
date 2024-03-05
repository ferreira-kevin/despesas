import { Entidade } from "./entidade";
import { Usuario } from "./usuario";

export class Despesa extends Entidade {
    public descricao: string;
    public data: Date;
    public idUsuario: string;
    public valor: number;

    public constructor(descricao: string, data: Date, idUsuario: string, valor: number, id?: string) {
        super(id);

        this.descricao = descricao;
        this.data = data;
        this.idUsuario = idUsuario;
        this.valor = valor;
    }

    alterarDespesa(descricao: string, data: Date, valor: number) {
        this.descricao = descricao;
        this.data = data;
        this.valor = valor;
        this.alterar();
    }
}