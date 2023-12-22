export class User {
    public id: number;
    public username: string;
    public name: string;
    public role: number;
    public user_type:any;
    constructor(user: any) {
        this.id = +user.id;
        this.username = user.username;
        this.name = user.name;
        this.user_type = user.user_type;
        this.role = +user.role
    }
}
