import { Team } from "./team-requests.interface";
import { User } from "./user-requests.interface";

export interface GetTeamUserResponse {
    ok:                                 boolean;
    team_user_quantity_for_the_request: number;
    team_users:                         TeamUser[];
}
export interface GetTeamUserByUserResponse {
    ok:                                 boolean;
    team_user_quantity_for_the_request: number;
    team_users:                         any[];
}
export interface GetTeamUserByTeamResponse {
    ok:                                 boolean;
    team_user_quantity_for_the_request: number;
    team_users:                         TeamUser[];
}
export interface UpdateIsActiveTeamUserResponse {
    ok:        boolean;
    msg:       string;
    team_user: TeamUser;
}
export interface UpdateIsActiveTeamUserRequest {
    id_team_user:   number;
    is_active:      boolean;
}
export interface EditTeamUserResponse {
    id_team_user:   number;
    ok:        boolean;
    msg:       string;
    team_user: TeamUser;
}
export interface EditTeamUserRequest {
    id_team_user:   number;
    beggining_date: Date;
    ending_date:    Date;
    id_user_f:      number;
    id_team_f:      number;
}
export interface CreateTeamUserResponse {
    ok:        boolean;
    team_user: TeamUser;
}

export interface CreateTeamUserRequest {
    beggining_date: Date;
    ending_date:    Date;
    id_user_f:      number;
    id_team_f:      number;
}
export interface DeleteTeamUserResponse {
    ok:  boolean;
    msg: string;
}
export interface TeamUser {
    id_team_user:   number;
    beggining_date: Date;
    ending_date:    Date;
    createdAt:      Date;
    updatedAt:      Date;
    id_user_f:      number;
    id_team_f:      number;
    Team:           Team;
    User:           User;
}