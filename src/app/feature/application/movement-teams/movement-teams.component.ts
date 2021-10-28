import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamUser } from 'src/app/core/interfaces/team_user-requests.interface';
import { HelpersService } from 'src/app/shared/services/helpers/helpers.service';
import { TeamUserService } from 'src/app/shared/services/team_user/team-user.service';

@Component({
  selector: 'app-movement-teams',
  templateUrl: './movement-teams.component.html',
  styleUrls: ['./movement-teams.component.scss'],
})
export class MovementTeamsComponent implements OnInit {
  /* =============================
                VARIABLES
     =============================
  */
  filterBy: string = 'TEAM';
  team_users: TeamUser[];
  desde: number = 0;
  loadingTeamUsers: boolean = false;
  thereWasAnError: boolean = false;
  constructor(
    public router: Router,
    public teamUserService: TeamUserService,
    public helpersService: HelpersService
  ) {}

  ngOnInit(): void {
    this.fetchTeamUsers();

  }
  /**
   * Get the team_users, calling the API.
   */
  fetchTeamUsers(): void {
    this.loadingTeamUsers = true;
    this.teamUserService.getTeamUsers(this.desde).subscribe(
      (resp) => {
        this.loadingTeamUsers = false;
        this.thereWasAnError = false;
        this.team_users = resp.team_users;
        console.log('resp ', resp);
      },
      (err) => {
        console.log('err ', err);
        this.loadingTeamUsers = false;
        this.thereWasAnError = true;
      }
    );
  }
  changeFilter(text: string): void {
    this.filterBy = text;
  }
  onChangeRadioButton(event: any) {
    this.changeFilter(event.target.value);
  }
  updatePage(event: number) {
    // console.log('Evento updatePage llamado: ', event);
    this.desde = event;
    this.fetchTeamUsers();
  }
}
