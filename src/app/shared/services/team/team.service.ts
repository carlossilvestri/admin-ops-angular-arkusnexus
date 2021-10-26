import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HelpersService } from '../helpers/helpers.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CreateATeamRequest,
  CreateATeamResponse,
  EditTeamByIdRequest,
  GetTeamByIdResponse,
  GetTeamResponse,
  UpdateIsActiveTeamByIdRequest,
  UpdateIsActiveTeamByIdResponse,
} from 'src/app/core/interfaces/team-requests.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  // Variables
  public url = environment.baseUrl;
  constructor(
    public http: HttpClient,
    public router: Router,
    public helpers: HelpersService
  ) {}

  /**
   * Create a new team.
   * @param team: CreateATeamRequest
   * @returns Observable<CreateATeamResponse>
   */
  createTeam(team: CreateATeamRequest): Observable<CreateATeamResponse> {
    const url = `${this.url}/team`;
    return this.http.post<CreateATeamResponse>(url, team).pipe(
      map((resp: CreateATeamResponse) => {
        Swal.fire('Correcto', 'Equipo creado.', 'success');
        return resp;
      })
    );
  }

  /**
   * Edit all fields of the team.
   * @param dataEditTeam: EditTeamByIdRequest
   * @returns Observable<GetTeamByIdResponse>
   */
  editTeam(dataEditTeam: EditTeamByIdRequest): Observable<GetTeamByIdResponse> {
    let url = `${this.url}/team/${dataEditTeam.id_team}`;
    return this.http.put<GetTeamByIdResponse>(url, dataEditTeam).pipe(
      map((resp: GetTeamByIdResponse) => {
        Swal.fire('Correcto', 'Se ha editado correctamente.', 'success');
        return resp;
      })
    );
  }

  /**
   * Update is_active field of a specific team.
   * @param dataTeamUpdateIsActive: UpdateIsActiveTeamByIdRequest
   * @returns Observable<UpdateIsActiveTeamByIdResponse>
   */
  updateIsActiveTeam(
    dataTeamUpdateIsActive: UpdateIsActiveTeamByIdRequest
  ): Observable<UpdateIsActiveTeamByIdResponse> {
    const url = `${this.url}/disable-team/${dataTeamUpdateIsActive.id_team}`;
    return this.http
      .patch<UpdateIsActiveTeamByIdResponse>(url, dataTeamUpdateIsActive)
      .pipe(
        map((resp: UpdateIsActiveTeamByIdResponse) => {
          Swal.fire('Correcto', 'Acción completada.', 'success');
          return resp;
        })
      );
  }
  /**
   * Get a list of teams registered on the system.
   * @param desde: number
   * @returns Observable<GetTeamResponse>
   */
  getTeams(desde: number = 0): Observable<GetTeamResponse> {
    const url = `${this.url}/team?desde=${desde}`;
    return this.http.get<GetTeamResponse>(url).pipe(
      map((resp: GetTeamResponse) => {
        return resp;
      })
    );
  }
  /**
   * Get a list of teams by name and is_active = true
   * @param desde: number, name: string
   * @returns Observable<GetTeamResponse>
   */
  getTeamsByName(desde: number, name: string): Observable<GetTeamResponse> {
    const url = `${this.url}/team-by-name?desde=${desde}&name=${name}`;
    return this.http.get<GetTeamResponse>(url).pipe(
      map((resp: GetTeamResponse) => {
        return resp;
      })
    );
  }
  /**
   * Get a team registered on the system by id.
   * @param id_team: number
   * @returns Observable<GetTeamByIdResponse>
   */
  getTeamById(id_team: number): Observable<GetTeamByIdResponse> {
    const url = `${this.url}/team/${id_team}`;
    return this.http.get<GetTeamByIdResponse>(url).pipe(
      map((resp: GetTeamByIdResponse) => {
        return resp;
      })
    );
  }
}
