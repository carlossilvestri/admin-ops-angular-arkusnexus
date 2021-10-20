
import { Level } from "./level-requests.interface";
import { Role } from "./role-requests.interface";

export interface CreateUserResponse {
    ok:    boolean;
    token: string;
    user:  User;
}
export interface CreateUserRequest {
    email:              string;
    technical_knoledge: string;
    name:               string;
    link_cv:            string;
    is_active_user:     boolean;
    createdAt:          Date;
    updatedAt:          Date;
    id_english_level_f: number;
    id_role_f:          number;
}
export interface LoginUserResponse {
    token: string;
    user:  User;
}
export interface LoginUserRequest {
    email:     string;
    password:  string;
}
export interface UserByIdResponse {
    ok:   boolean;
    user: User;
}
export interface UpdateUserResponse {
    ok:   boolean;
    msg:  string;
    user: User;
}
export interface UpdateUserRequest {
    email:              string;
    technical_knoledge: string;
    name:               string;
    link_cv:            string;
    is_active_user:     boolean;
    createdAt:          Date;
    updatedAt:          Date;
    id_english_level_f: number;
    id_role_f:          number;
    token:              string;
}
export interface GetUsersResponse {
    ok:                             boolean;
    users_quantity_for_the_request: number;
    users:                          User[];
}

export interface User {
    id_user:            number;
    email:              string;
    technical_knoledge: string;
    name:               string;
    link_cv:            string;
    is_active_user:     boolean;
    createdAt:          Date;
    updatedAt:          Date;
    id_english_level_f: number;
    id_role_f:          number;
    Role:               Role;
    Level:              Level;
}
