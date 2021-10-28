import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamService } from 'src/app/shared/services/team/team.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HelpersService } from '../../../../shared/services/helpers/helpers.service';
import { Team } from 'src/app/core/interfaces/team-requests.interface';
import { UserService } from '../../../../shared/services/user/user.service';
import { User } from '../../../../core/interfaces/user-requests.interface';
import { TeamUserService } from '../../../../shared/services/team_user/team-user.service';
import { TeamUser } from '../../../../core/interfaces/team_user-requests.interface';

@Component({
  selector: 'app-movement-team',
  templateUrl: './movement-team.component.html',
  styleUrls: ['./movement-team.component.scss']
})
export class MovementTeamComponent implements OnInit {
  
  loadingUsers: boolean = false;
  loadingTeams: boolean = false;
  loadingTeamUser: boolean = false;
  teams: Team[];
  users: User[];
  id_team_user: number = 0;
  forma: FormGroup;
  team_users: TeamUser[];

  constructor(
    private fb: FormBuilder,
    public teamService: TeamService,
    public userService : UserService,
    public teamUserService : TeamUserService,
    public router: Router,
    private route: ActivatedRoute,
    public helpersService: HelpersService
  ) {}

  ngOnInit(): void {
    this.id_team_user = this.route.snapshot.params['id'];
    console.log('id_team_user ', this.id_team_user);
    this.fetchFields();
  }
  fetchFields(): void {
    this.fetchTeams();
    if (this.id_team_user) {
      this.fetchTeams();
      this.fetchUsers();
    } else {
      this.initFormCreate();
    }
  }
  /*
  // TODO - Get TeamUser by id.
  fetchTeamUser(): void {
    this.loadingTeamUser = true;
    this.teamUserService.get(this.id_team_user).subscribe((resp) => {
      this.team_users = resp.;
      console.log("account ", this.account);
      this.initFormEdit();
    });
  }
  */
  fetchTeams() : void {
    this.loadingTeams = true;
    this.teamService.getTeams().subscribe((resp) => {
      this.teams = resp.teams;
      this.loadingTeams = false;
    });
  }
  fetchUsers() : void {
    this.loadingUsers = true;
    this.userService.getUsers(0).subscribe((resp) => {
      this.users = resp.users;
      this.loadingUsers = false;
    });
  }
  
  initFormCreate() {
    this.forma = this.fb.group({
      id_user_f: [0, [Validators.required, Validators.minLength(1)]],
      id_team_f: [0, [Validators.required, Validators.min(1)]],
      beggining_date: ['', [Validators.required]],
      ending_date: ['', [Validators.required]],
    });
    this.loadingTeamUser = false;
  }
}
