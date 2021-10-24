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
export interface GetTeamByIdResponse {
    ok:   boolean;
    team: Team;
}
export interface EditTeamByIdRequest {
    name:  string;
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
    name:      string;
    createdAt: Date;
    updatedAt: Date;
}