export enum RolesEnum {
    USER = 2,
    ADMIN = 1
}
export enum SuperAdminEnum {
    SUPERADMIN = 3
}
// optional: Record type annotation guaranties that 
// all the values from the enum are presented in the mapping
// export const Roles2LabelMapping: Record<RolesEnum, string> = {
//     [RolesEnum.User]: "User",
//     [RolesEnum.Admin]: "Admin",
// };