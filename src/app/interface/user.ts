import { RolesEnum } from "../enums/roles.enum";
import { ChangePasswordComponent } from "../user/change-password/change-password.component";

export interface UserRegister {
    first_name: string|"";
    last_name: string|"";
    email: string|"";
    age: number;
    role_id:number;
    password: string|"";
}
export interface editProfile {
    id: number|"";
    first_name: string|"";
    last_name: string|"";
    email: string|"";
    age: number|"";
    role_id:number|"";
}
export interface editSelfProfile {
    first_name: string|"";
    last_name: string|"";
    email: string|"";
    age: number|"";
}
export interface User {
    id:number;
    first_name: string|"";
    last_name: string|"";
    email: string|"";
    age: number|0;
    role:Role;
    role_id: number|0;
    status: number|1;
    phone: string|"";
    secondary_phone: string|"";
    secondary_email: string|"";
    company: string|"";
    address: string|"";
    designation: string|"";
    country: string|"";
    zip: string|"";
    password: string|"";
}


export interface Role{
    id: number;
    name: string;
    status: number;
}