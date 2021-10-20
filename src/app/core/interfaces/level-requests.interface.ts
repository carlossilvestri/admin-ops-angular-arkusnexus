export interface GetLevelsResponse {
    ok:     boolean;
    levels: Level[];
}
export interface GetLevelByIdResponse {
    ok:    boolean;
    level: Level;
}
export interface CreateLevelResponse {
    ok:    boolean;
    level: Level;
}
export interface CreateLevelRequest {
    name:    string;
}
export interface DeleteLevelResponse {
    ok:  boolean;
    msg: string;
}
export interface Level {
    id_level: number;
    name:      string;
    createdAt: Date;
    updatedAt: Date;
}