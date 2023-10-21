import { UserRoleEnum } from "./UserRoleEnum";

export interface UserModel {
    id: string,
    login: string,
    password: string,
    name: string,
    email: string,
    role: string | null | undefined | UserRoleEnum
}