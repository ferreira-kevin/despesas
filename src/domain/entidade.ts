import uuid from "../utils/uuid";

export class Entidade {
    public readonly id: string;
    public readonly criadoEm: Date;
    private _alteradoEm: Date;

    constructor(id?: string) {
        if (!id) {
            this.id = uuid();
        }

        this.criadoEm = new Date();
        this.alterar();
    }

    public get alteradoEm() : Date {
        return this._alteradoEm;
    }

    private set alteradoEm(data: Date) {
        this._alteradoEm = data;
    }

    public alterar() {
        this._alteradoEm = new Date();
    }
}