import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HelpersService } from '../helpers/helpers.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetUsersResponse,
  LoginUserRequest,
  LoginUserResponse,
  UpdateIsActiveUserRequest,
  UpdateIsActiveUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  User,
  UserByIdResponse,
} from 'src/app/core/interfaces/user-requests.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Variables
  public url = environment.baseUrl;
  constructor(
    public http: HttpClient,
    public router: Router,
    public helpers: HelpersService
  ) {}

  /**
   * Create a new user.
   * @param user: CreateUserRequest
   * @returns Observable<CreateUserResponse>
   */
  createUser(user: CreateUserRequest): Observable<CreateUserResponse> {
    const url = `${this.url}/user`;
    return this.http.post<CreateUserResponse>(url, user).pipe(
      map((resp: CreateUserResponse) => {
        Swal.fire('Correcto', 'Usuario creado ' + user.email, 'success');
        return resp;
      })
    );
  }
  /**
   * Log the user in the system. And save token on locall storage if login is susccess.
   * @param datoLogin : LoginUserRequest
   * @returns Observable<LoginUserResponse>
   */
  login(datoLogin: LoginUserRequest): Observable<LoginUserResponse> {
    const url = `${this.url}/login`;
    return this.http.post<LoginUserResponse>(url, datoLogin).pipe(
      map((resp: LoginUserResponse) => {
        // console.log(resp);
        resp.token
          ? this.helpers.saveOnLocalStorage('token', resp.token)
          : null;
        resp.user ? this.helpers.saveOnLocalStorage('user', resp.user) : null;
        return resp;
      })
    );
  }
  /**
   * Get a list of users registered on the system.
   * @param desde: number
   * @returns Observable<GetUsersResponse>
   */
  getUsers(desde: number): Observable<GetUsersResponse> {
    const url = `${this.url}/users?desde=${desde}`;
    return this.http.get<GetUsersResponse>(url).pipe(
      map((resp: GetUsersResponse) => {
        // console.log(resp);
        return resp;
      })
    );
  }
    /**
   * Get the user logged on the Local Storage.
   * @returns User[]
   */
    getUserByLocalStorage(): User {
      console.log("user ", this.helpers.getFromLocalStorage('user'));
      return this.helpers.getFromLocalStorage('user');
    }
  /**
   * Get a list of users registered on the system.
   * @param id_user: number
   * @returns Observable<UserByIdResponse>
   */
  getUserById(id_user: number): Observable<UserByIdResponse> {
    const url = `${this.url}/user/${id_user}`;
    return this.http.get<UserByIdResponse>(url).pipe(
      map((resp: UserByIdResponse) => {
        return resp;
      })
    );
  }
  /**
   * Get a list of users by name and is_active_user = true
   * @param desde: number, name: string
   * @returns Observable<GetUsersResponse>
   */
  getUsersByName(desde: number, name: string): Observable<GetUsersResponse> {
    const url = `${this.url}/users-by-name?desde=${desde}&name=${name}`;
    return this.http.get<GetUsersResponse>(url).pipe(
      map((resp: GetUsersResponse) => {
        return resp;
      })
    );
  }
  /**
   * Edit all fields of the user.
   * @param dataEditUser: UpdateUserRequest
   * @returns Observable<UpdateUserResponse>
   */
  editUser(dataEditUser: UpdateUserRequest, isAdmin: boolean = false): Observable<UpdateUserResponse> {
    let url = '';
    if(isAdmin){
      url =  `${this.url}/edit-any-user/${dataEditUser.id_user}`;
    }else{
      url =  `${this.url}/user/${dataEditUser.id_user}`;
    }
    return this.http.put<UpdateUserResponse>(url, dataEditUser).pipe(
      map((resp: UpdateUserResponse) => {
        if(!isAdmin){
          this.helpers.saveOnLocalStorage('user', resp.user);
        }
        Swal.fire('Correcto', 'Se ha editado correctamente.', 'success');
        return resp;
      })
    );
  }
  /**
   * Log the user in the system. And save token on locall storage if login is susccess.
   * @param dataEditUser: UpdateIsActiveUserRequest
   * @returns Observable<UpdateIsActiveUserResponse>
   */
    updateIsActiveUser(dataEditUser: UpdateIsActiveUserRequest): Observable<UpdateIsActiveUserResponse> {
      const url = `${this.url}/disable-user/${dataEditUser.id_user}`;
      return this.http.patch<UpdateIsActiveUserResponse>(url, dataEditUser).pipe(
        map((resp: UpdateIsActiveUserResponse) => {
          this.helpers.saveOnLocalStorage('user', resp.user);
          Swal.fire('Correcto', 'Acci??n completada.', 'success');
          return resp;
        })
      );
    }
  /**
   * logOut. Logs out the user, removing some fields of Local Storage, and moving the user to login.
   * @return void
   */
  logOut(): void {
    this.helpers.removeFieldLocalStorage('user');
    this.helpers.removeFieldLocalStorage('token');
    this.helpers.removeFieldLocalStorage('roles');
    this.router.navigate(['/login']);
  }
}
