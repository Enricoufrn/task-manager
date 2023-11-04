import { UserRoleEnum } from "../domain/UserRoleEnum";

export const getUserRole = (status: string | null | undefined) => {
    if (status == null || status == undefined)
        return null;
    switch (status) {
        case 'ROLE_ADMIN':
            return UserRoleEnum.ROLE_ADMIN;
        case 'ROLE_COMMON':
            return UserRoleEnum.ROLE_COMMON;
        default:
            return null;
    }
}