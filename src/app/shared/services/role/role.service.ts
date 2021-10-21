import { Injectable } from '@angular/core';
import {
  GetRoleByIdResponse,
  GetRolesResponse,
  Role,
} from 'src/app/core/interfaces/role-requests.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HelpersService } from '../helpers/helpers.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  // Variables
  public url = environment.baseUrl;
  constructor(public http: HttpClient, public helpers: HelpersService) {}

  /**
   * Get a list of roles registered on the system.
   * @returns Observable<GetUsersResponse>
   */
  getRoles(): Observable<GetRolesResponse> {
    const url = `${this.url}/role`;
    return this.http.get<GetRolesResponse>(url).pipe(
      map((resp: GetRolesResponse) => {
        resp.roles ? this.helpers.saveOnLocalStorage('roles', resp.roles) : null;
        return resp;
      })
    );
  }
  /**
   * Get a list of roles registered on the Local Storage.
   * @returns Role[]
   */
  getRolesByLocalStorage(): Role[] {
    return this.helpers.getFromLocalStorage('roles');
  }

  /**
   * Get a list of users registered on the system.
   * @param id_role: number
   * @returns Observable<GetRoleByIdResponse>
   */
  getRoleById(id_role: number): Observable<GetRoleByIdResponse> {
    const url = `${this.url}/role/${id_role}`;
    return this.http.get<GetRoleByIdResponse>(url).pipe(
      map((resp: GetRoleByIdResponse) => {
        return resp;
      })
    );
  }
}
