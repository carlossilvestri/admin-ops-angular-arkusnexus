import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../../../../shared/services/user/user.service';
import { User } from '../../../../../core/interfaces/user-requests.interface';
import { HelpersService } from '../../../../../shared/services/helpers/helpers.service';

@Component({
  selector: 'app-application-bar',
  templateUrl: './application-bar.component.html',
  styleUrls: ['./application-bar.component.scss']
})
export class ApplicationBarComponent implements OnInit {

  user: User;
  constructor(public router: Router, public userService : UserService, public helperService : HelpersService) { }

  ngOnInit(): void {
    this.fetchUser();
  }
  onCloseSession() : void{
    Swal.fire({
      title: '¿Estás seguro/a?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.logOut();
      }
    });
  }
  fetchUser(){
    this.user = this.helperService.getFromLocalStorage('user');
  }
  isSuperAdmin() : boolean {
    let isSuperAdmin : boolean = false;
    if(this.user.Role.name === 'SUPER_ADMIN'){
      isSuperAdmin = true;
    }else{
      isSuperAdmin = false;
    }
    return isSuperAdmin;
  }

}
