import { Team } from "./team-requests.interface";

export interface GetAccountsResponse {
    ok:                               boolean;
    account_quantity_for_the_request: number;
    accounts:                         Account[];
}
export interface GetAccountByIdResponse {
    ok:      boolean;
    account: Account;
}
export interface GetAccountsByNameResponse {
    ok:                               boolean;
    account_quantity_for_the_request: number;
    accounts:                         Account[];
}
export interface CreateAccountResponse {
    ok:      boolean;
    msg:     string;
    account: Account;
}
export interface CreateAccountRequest {
    is_active:                   boolean;
    id_team_f:                   number;
    responsible_operations_name: string;
    name_client:                 string;
    account_name:                string;
}
export interface EditAccountResponse {
    ok:   boolean;
    team: Team;
}

export interface EditAccountRequest {
    id_account:                  number;
    is_active:                   boolean;
    id_team_f:                   number;
    responsible_operations_name: string;
    name_client:                 string;
    account_name:                string;
}
export interface UpdateIsActiveAccountResponse {
    ok:      boolean;
    msg:     string;
    account: Account;
}
export interface UpdateIsActiveAccountRequest {
    is_active:      boolean;
    id_account:     number;
    token:          string;
}
export interface Account {
    id_account:                  number;
    is_active:                   boolean;
    responsible_operations_name: string;
    name_client:                 string;
    account_name:                string;
    createdAt:                   Date;
    updatedAt:                   Date;
    id_team_f:                   number;
    Team:                        Team;
}