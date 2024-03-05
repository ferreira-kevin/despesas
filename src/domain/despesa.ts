export class Despesa {
    public readonly id: string;
    public descricao: string;
    public data: string;
    public usuario: string;
    public valor: number;

    public constructor(props: Omit<Despesa, 'id'>, id: string) {
        Object.assign(this, props);
        this.id = id;
    }
}