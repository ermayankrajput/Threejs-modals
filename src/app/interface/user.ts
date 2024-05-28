import { RolesEnum } from "../enums/roles.enum";
import { ChangePasswordComponent } from "../user/change-password/change-password.component";

export interface UserRegister {
    first_name: string|null;
    last_name: string|null;
    email: string|null;
    age: number;
    role_id:number;
    password: string|null;
}
export interface editProfile {
    id: number|null;
    first_name: string|null;
    last_name: string|null;
    email: string|null;
    age: number|null;
    role_id:number|null;
}
export interface editSelfProfile {
    first_name: string|null;
    last_name: string|null;
    email: string|null;
    age: number|null;
}
export interface User {
    id:number;
    first_name: string|null;
    last_name: string|null;
    email: string|null;
    age: number;
    role:Role;
    status: number;
    phone: string|null;
    secondary_phone: string|null;
    secondary_email: string|null;
    company: string|null;
    address: string|null;
    designation: string|null;
    country: string|null;
    zip: string|null;
}
export interface Role{
    id: number;
    name: string;
    status: number;
}