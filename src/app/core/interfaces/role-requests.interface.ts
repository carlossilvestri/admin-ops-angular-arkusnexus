export interface GetRolesResponse {
    ok:    boolean;
    roles: Role[];
}
export interface GetRoleByIdResponse {
    ok:   boolean;
    role: Role;
}
export interface DeleteRoleResponse {
    ok:  boolean;
    msg: string;
}
export interface UpdateRoleResponse {
    ok:  boolean;
    msg: string;
}
export interface UpdateRoleRequest {
    name: string;
}
export interface CreateRoleResponse {
    ok:   boolean;
    role: Role;
}
export interface CreateRoleRequest {
    name: string;
}
export interface Role {
    id_role: number;
    name:      string;
    createdAt: Date;
    updatedAt: Date;
}