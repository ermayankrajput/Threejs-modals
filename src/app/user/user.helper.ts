import { RolesEnum } from "../enums/roles.enum";
import { User } from "../interface/user";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class UserHelper{
    isAdmin = (user:User) => {
        return user.role.id == RolesEnum.ADMIN
    }
}
