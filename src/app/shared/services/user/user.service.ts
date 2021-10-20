import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HelpersService } from '../helpers/helpers.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Variables
  public url = environment.baseUrl;
  constructor(public http: HttpClient, public router: Router, public helpers: HelpersService) {}

  /*
  Doc: Crea un usuario nuevo en la BD.
  Param: obj: UserAlCrear
  */
  /*
  createUser(usuario: UserAlCrear) {
    const url = `${this.url}/user`;
    return this.http.post(url, usuario).pipe(
      // catchError(this.handleError),
      map((resp: any) => {
        Swal.fire('Correcto', 'Usuario creado ' + usuario.emailU, 'success');
        return resp.usuario;
      })
    );
  }
  */

  
}
