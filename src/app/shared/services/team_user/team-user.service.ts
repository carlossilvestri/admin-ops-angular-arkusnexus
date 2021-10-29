import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HelpersService } from '../helpers/helpers.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {
  CreateTeamUserRequest,
  CreateTeamUserResponse,
  EditTeamUserRequest,
  EditTeamUserResponse,
  GetByIdTeamUserResponse,
  GetTeamUserResponse,
  UpdateIsActiveTeamUserRequest,
  UpdateIsActiveTeamUserResponse,
} from 'src/app/core/interfaces/team_user-requests.interface';

@Injectable({
  providedIn: 'root',
})
export class TeamUserService {
  // Variables
  public url = environment.baseUrl;
  constructor(
    public http: HttpClient,
    public router: Router,
    public helpers: HelpersService
  ) {}

  /**
   * Create a new team_user.
   * @param team: CreateTeamUserRequest
   * @returns Observable<CreateTeamUserResponse>
   */
  createTeamUser(
    team_user: CreateTeamUserRequest
  ): Observable<CreateTeamUserResponse> {
    const url = `${this.url}/team_user`;
    return this.http.post<CreateTeamUserResponse>(url, team_user).pipe(
      map((resp: CreateTeamUserResponse) => {
        Swal.fire('Correcto', 'Equipo creado.', 'success');
        return resp;
      })
    );
  }

  /**
   * Edit all fields of the team.
   * @param dataEditTeamUser: EditTeamUserRequest
   * @returns Observable<EditTeamUserResponse>
   */
  editTeamUser(
    dataEditTeamUser: EditTeamUserRequest
  ): Observable<EditTeamUserResponse> {
    let url = `${this.url}/team_user/${dataEditTeamUser.id_team_user}`;
    return this.http.put<EditTeamUserResponse>(url, dataEditTeamUser).pipe(
      map((resp: EditTeamUserResponse) => {
        Swal.fire('Correcto', 'Se ha editado correctamente.', 'success');
        return resp;
      })
    );
  }

  /**
   * Update is_active field of a specific team_user.
   * @param dataTeamUserUpdateIsActive: UpdateIsActiveTeamUserRequest
   * @returns Observable<UpdateIsActiveTeamUserResponse>
   */
  updateIsActiveTeam(
    dataTeamUserUpdateIsActive: UpdateIsActiveTeamUserRequest
  ): Observable<UpdateIsActiveTeamUserResponse> {
    const url = `${this.url}/disable-team/${dataTeamUserUpdateIsActive.id_team_user}`;
    return this.http
      .patch<UpdateIsActiveTeamUserResponse>(url, dataTeamUserUpdateIsActive)
      .pipe(
        map((resp: UpdateIsActiveTeamUserResponse) => {
          Swal.fire('Correcto', 'Acción completada.', 'success');
          return resp;
        })
      );
  }
  /**
   * Get a list of team_users registered on the system.
   * @param desde: number
   * @returns Observable<GetTeamUserResponse>
   */
  getTeamUsers(desde: number): Observable<GetTeamUserResponse> {
    const url = `${this.url}/team_user?desde=${desde}`;
    return this.http.get<GetTeamUserResponse>(url).pipe(
      map((resp: GetTeamUserResponse) => {
        return resp;
      })
    );
  }

    /**
   * Get a list of team_users by user_name registered on the system.
   * @param user_name: string
   * @returns Observable<GetTeamUserResponse>
   */
     getTeamUserByUserName(user_name: string): Observable<GetTeamUserResponse> {
      const url = `${this.url}/team_user-by-user-name?user_name=${user_name}`;
      return this.http.get<GetTeamUserResponse>(url).pipe(
        map((resp: GetTeamUserResponse) => {
          return resp;
        })
      );
    }

    /**
   * Get a list of team_users registered on the system.
   * @param id_team_user: number
   * @returns Observable<GetByIdTeamUserResponse>
   */
     getTeamUserById(id_team_user: number): Observable<GetByIdTeamUserResponse> {
      const url = `${this.url}/team_user/${id_team_user}`;
      return this.http.get<GetByIdTeamUserResponse>(url).pipe(
        map((resp: GetByIdTeamUserResponse) => {
          return resp;
        })
      );
    }
  /**
   * Get a list of team_users registered on the system by id_user_f.
   * @param desde: number
   * @returns Observable<GetTeamUserResponse>
   */
  getTeamUsersByUserId(
    desde: number,
    id_user_f: number
  ): Observable<GetTeamUserResponse> {
    const url = `${this.url}/team_user_by_user_f/${id_user_f}?desde=${desde}`;
    return this.http.get<GetTeamUserResponse>(url).pipe(
      map((resp: GetTeamUserResponse) => {
        return resp;
      })
    );
  }
  /**
   * Get a list of team_users registered on the system by id_team_f.
   * @param desde: number
   * @returns Observable<GetTeamUserResponse>
   */
  getTeamUsersByTeamId(
    desde: number,
    id_team_f: number
  ): Observable<GetTeamUserResponse> {
    const url = `${this.url}/team_user_by_team_f/${id_team_f}?desde=${desde}`;
    return this.http.get<GetTeamUserResponse>(url).pipe(
      map((resp: GetTeamUserResponse) => {
        return resp;
      })
    );
  }
}
