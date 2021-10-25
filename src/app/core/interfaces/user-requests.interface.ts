
import { Level } from "./level-requests.interface";
import { Role } from "./role-requests.interface";

export interface CreateUserResponse {
    ok:    boolean;
    token?: string;
    user?:  User;
    msg?: string
}
export interface CreateUserRequest {
    email:              string;
    password?:           string;
    technical_knoledge: string;
    name:               string;
    link_cv:            string;
    is_active_user:     boolean;
    createdAt?:          Date;
    updatedAt?:          Date;
    id_english_level_f: number;
    id_role_f:          number;
}
export interface LoginUserResponse {
    token?: string;
    user?:  User;
    msg?:   string;
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
    createdAt?:          Date;
    updatedAt?:          Date;
    id_english_level_f: number;
    id_role_f:          number;
    token:              string;
    id_user:            number;
    password:           string;
}
export interface GetUsersResponse {
    ok:                             boolean;
    users_quantity_for_the_request: number;
    users:                          User[];
}
export interface UpdateIsActiveUserResponse {
    ok:   boolean;
    msg:   string;
    user: User;
}
export interface UpdateIsActiveUserRequest {
    is_active_user:     boolean;
    id_user:            number;
    token:              string;
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
