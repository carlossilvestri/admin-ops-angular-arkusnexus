import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../../../../shared/services/user/user.service';

@Component({
  selector: 'app-application-bar',
  templateUrl: './application-bar.component.html',
  styleUrls: ['./application-bar.component.scss']
})
export class ApplicationBarComponent implements OnInit {

  constructor(public router: Router, public userService : UserService) { }

  ngOnInit(): void {
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

}
