export interface GetTeamResponse {
    ok:            boolean;
    desde:         number;
    team_quantity: number;
    teams:         Team[];
}
export interface DeleteTeamByIdResponse {
    ok:  boolean;
    msg: string;
}
export interface UpdateIsActiveTeamByIdResponse {
    ok:  boolean;
    msg: string;
}
export interface UpdateIsActiveTeamByIdRequest {
    is_active:  boolean;
    id_team:    number;
    token:      string;
}
export interface GetTeamByIdResponse {
    ok:   boolean;
    team: Team;
}
export interface EditTeamByIdRequest {
    name:  string;
    id_team: number;
}
export interface CreateATeamResponse {
    ok:   boolean;
    team: Team;
}
export interface CreateATeamRequest {
    name:  string;
}
export interface Team {
    id_team:   number;
    is_active?: boolean; 
    name:      string;
    createdAt: Date;
    updatedAt: Date;
}