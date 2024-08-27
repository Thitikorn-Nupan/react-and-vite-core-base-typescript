export class Product {
    public id : number
    public title : string
    public price : number
    public description : string
    public image : string

    constructor(id : number, title : string, price : number, description : string, image : string) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.image = image;
    }
}