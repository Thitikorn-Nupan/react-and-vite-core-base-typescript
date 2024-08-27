export class User {

    public id : number
    public email : string
    public username : string
    public password : string

    constructor(id : number, email : string , username : string, password : string) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
    }

}