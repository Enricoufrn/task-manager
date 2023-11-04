import { UserRoleEnum } from "./UserRoleEnum";

export class UserModel {
    id: string;
    login: string;
    password: string;
    name: string;
    email: string;
    role: string | null | undefined | UserRoleEnum;

    constructor(id: string, login: string, password: string, name: string, email: string, role: string | null | undefined | UserRoleEnum) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.name = name;
        this.email = email;
        this.role = role;
    }
}