import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/user-requests.interface';
import { UserService } from 'src/app/shared/services/user/user.service';

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
    public userService: UserService
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

}
