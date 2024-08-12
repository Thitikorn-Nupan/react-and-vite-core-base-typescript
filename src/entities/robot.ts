export class Robot {

    public rid : number
    public codeName : string
    public price : number
    public active : boolean

    constructor(rid: number, codeName: string, price: number, active: boolean) {
        this.rid = rid;
        this.codeName = codeName;
        this.price = price;
        this.active = active;
    }
}