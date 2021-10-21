import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Level } from 'src/app/core/interfaces/level-requests.interface';
import { Role } from 'src/app/core/interfaces/role-requests.interface';
import { User } from 'src/app/core/interfaces/user-requests.interface';
import { LevelService } from 'src/app/shared/services/level/level.service';
import { RoleService } from 'src/app/shared/services/role/role.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-my-user',
  templateUrl: './my-user.component.html',
  styleUrls: ['./my-user.component.scss']
})
export class MyUserComponent implements OnInit {
  /* =============================
                VARIABLES
     =============================
  */
     user: User;
     roles: Role[];
     levels: Level[];
     forma: FormGroup;
  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    public roleService: RoleService,
    public levelService: LevelService
  ) { }

  ngOnInit(): void {
    this.fetchFields();
  }
  fetchFields() : void {
    this.fetchRoles();
    this.fetchLevels();
    this.fetchMyUser();
  }
  fetchRoles() : void {
    this.roles = this.roleService.getRolesByLocalStorage();
  }
  fetchMyUser() : void{
    this.user = this.userService.getUserByLocalStorage();
  }
  fetchLevels() : void{
    this.levels = this.levelService.getRolesByLocalStorage();
  }


}
