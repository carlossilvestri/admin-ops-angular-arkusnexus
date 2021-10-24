import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateIsActiveUserRequest, User } from 'src/app/core/interfaces/user-requests.interface';
import { HelpersService } from 'src/app/shared/services/helpers/helpers.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  /* =============================
                VARIABLES
     =============================
  */
  users : User[];
  desde: number = 0;
  loadingUsers: boolean = false;
  thereWasAnError: boolean = false;
  constructor(
    public router: Router,
    public userService: UserService,
    public helpersService: HelpersService
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
  }
  fetchUsers(){
    this.loadingUsers = true;
    this.userService.getUsers(this.desde).subscribe(
      (resp) => {
        this.loadingUsers = false;
        this.thereWasAnError = false;
        this.users = resp.users;
        console.log('resp ', resp);
      },
      (err) => {
        console.log('err ', err);
        this.loadingUsers = false;
        this.thereWasAnError = true;
      }
    );
  }
 /**
  * searchUserByName() : void
  * Search users by name. It fills variable users.
  * @param event : string 
  * @return void
  */
  searchUserByName(event : string) : void{
    console.log("event ", event);
    this.loadingUsers = true;
    this.userService.getUsersByName(this.desde, event).subscribe(
      (resp) => {
        this.loadingUsers = false;
        this.thereWasAnError = false;
        this.users = resp.users;
        console.log('resp ', resp);
      },
      (err) => {
        console.log('err ', err);
        this.loadingUsers = false;
        this.thereWasAnError = true;
      }
    );
  }
  updatePage(event: number) {
    // console.log('Evento updatePage llamado: ', event);
    this.desde = event;
    this.fetchUsers();
  }
  /**
   * updateIsActiveUser() Update the fiel is_active_user of a
   * @param is_active_user : boolean
   * @return void
   */
  updateIsActiveUser(user : User) : void{
    Swal.fire({
      title: '¿Estás seguro/a?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
    }).then((result) => {
      if (result.isConfirmed) {
        // Create the object:
        const userToUpdate : UpdateIsActiveUserRequest = {
          is_active_user:     !user.is_active_user,
          id_user:            user.id_user,
          token:              this.helpersService.getFromLocalStorage('token')
        }
        console.log("userToUpdate ", userToUpdate);
        // Editar mediante el servicio.
        this.userService.updateIsActiveUser(userToUpdate).subscribe();
      }
    });
  }

}
