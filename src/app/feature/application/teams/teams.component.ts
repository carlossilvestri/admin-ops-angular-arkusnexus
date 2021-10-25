import { Component, OnInit } from '@angular/core';
import {
  Team,
  UpdateIsActiveTeamByIdRequest,
} from 'src/app/core/interfaces/team-requests.interface';
import { Router } from '@angular/router';
import { HelpersService } from 'src/app/shared/services/helpers/helpers.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import Swal from 'sweetalert2';
import { TeamService } from '../../../shared/services/team/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  /* =============================
                VARIABLES
     =============================
  */
  teams: Team[];
  desde: number = 0;
  loadingTeams: boolean = false;
  thereWasAnError: boolean = false;
  constructor(
    public router: Router,
    public teamService: TeamService,
    public helpersService: HelpersService
  ) {}

  ngOnInit(): void {
    this.fetchTeams();
  }

  fetchTeams() {
    this.loadingTeams = true;
    this.teamService.getTeams(this.desde).subscribe(
      (resp) => {
        this.loadingTeams = false;
        this.thereWasAnError = false;
        this.teams = resp.teams;
        console.log('resp ', resp);
      },
      (err) => {
        console.log('err ', err);
        this.loadingTeams = false;
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
  searchUserByName(event: string): void {
    console.log('event ', event);
    this.loadingTeams = true;
    this.teamService.getTeamsByName(this.desde, event).subscribe(
      (resp) => {
        this.loadingTeams = false;
        this.thereWasAnError = false;
        this.teams = resp.teams;
        console.log('resp ', resp);
      },
      (err) => {
        console.log('err ', err);
        this.loadingTeams = false;
        this.thereWasAnError = true;
      }
    );
  }
  updatePage(event: number) {
    // console.log('Evento updatePage llamado: ', event);
    this.desde = event;
    this.fetchTeams();
  }
  /**
   * updateIsActiveTeam() Update the fiel is_active of a
   * @param is_active : boolean
   * @return void
   */
  updateIsActiveTeam(team: Team): void {
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
        const teamToUpdate: UpdateIsActiveTeamByIdRequest = {
          is_active: !team.is_active,
          id_team: team.id_team,
          token: this.helpersService.getFromLocalStorage('token'),
        };
        console.log('teamToUpdate ', teamToUpdate);
        // Editar mediante el servicio.
        this.teamService.updateIsActiveTeam(teamToUpdate).subscribe((resp) => {
          this.fetchTeams();
        });
      }
    });
  }
}
