import { Injectable } from '@angular/core';
import {
  GetLevelByIdResponse,
  GetLevelsResponse,
  Level,
} from 'src/app/core/interfaces/level-requests.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelpersService } from '../helpers/helpers.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  // Variables
  public url = environment.baseUrl;
  constructor(public http: HttpClient, public helpers: HelpersService) {}

  /**
   * Get a list of levels registered on the system.
   * @returns Observable<GetUsersResponse>
   */
  getLevels(): Observable<GetLevelsResponse> {
    const url = `${this.url}/level`;
    return this.http.get<GetLevelsResponse>(url).pipe(
      map((resp: GetLevelsResponse) => {
        resp.levels
          ? this.helpers.saveOnLocalStorage('levels', resp.levels)
          : null;
        return resp;
      })
    );
  }
  /**
   * Get a list of levels registered on the Local Storage.
   * @returns Level[]
   */
  getRolesByLocalStorage(): Level[] {
    return this.helpers.getFromLocalStorage('levels');
  }

  /**
   * Get a list of levels registered on the system.
   * @param id_level: number
   * @returns Observable<GetLevelByIdResponse>
   */
  getLevelById(id_level: number): Observable<GetLevelByIdResponse> {
    const url = `${this.url}/level/${id_level}`;
    return this.http.get<GetLevelByIdResponse>(url).pipe(
      map((resp: GetLevelByIdResponse) => {
        return resp;
      })
    );
  }
}
