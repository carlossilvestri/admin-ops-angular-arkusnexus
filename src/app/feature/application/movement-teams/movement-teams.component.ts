import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamUser } from 'src/app/core/interfaces/team_user-requests.interface';
import { HelpersService } from 'src/app/shared/services/helpers/helpers.service';
import { TeamService } from 'src/app/shared/services/team/team.service';
import { TeamUserService } from 'src/app/shared/services/team_user/team-user.service';
import { Team } from '../../../core/interfaces/team-requests.interface';
import { DatePipe } from '@angular/common';

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
  beggining_date: string = '';
  desde: number = 0;
  loadingTeams: boolean = false;
  teams: Team[];
  loadingTeamUsers: boolean = false;
  thereWasAnError: boolean = false;
  id_team: number = 0;

  constructor(
    public router: Router,
    public teamUserService: TeamUserService,
    public teamService: TeamService,
    public helpersService: HelpersService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.fetchTeams();
    this.fetchTeamUsers();
  }
  fetchTeams(): void {
    this.loadingTeams = true;
    this.teamService.getTeams().subscribe((resp) => {
      this.teams = resp.teams;
      this.loadingTeams = false;
    });
  }
  fetchUserTeamsByTeamId(): void {
    this.loadingTeamUsers = true;
    this.teamUserService
      .getTeamUsersByTeamId(this.desde, this.id_team)
      .subscribe(
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
  fetchUserTeamsByBegginingDate(date: string): void {
    console.log('date ', date);
    this.loadingTeamUsers = true;
    this.teamUserService.getTeamUserByBegginingDate(this.desde, date).subscribe(
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
  fetchUserTeamsByEndingDate(date: string): void {
    console.log('date ', date);
    this.loadingTeamUsers = true;
    this.teamUserService.getTeamUserByEndingDate(this.desde, date).subscribe(
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
  searchTeamUsersByName(user_name: string): void {
    this.loadingTeamUsers = true;
    this.teamUserService.getTeamUserByUserName(user_name).subscribe(
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
  onTeamChange(newValue) {
    this.id_team = newValue.target.value;
    this.fetchUserTeamsByTeamId();
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
  onChangeBegginingDate(event: any) {
    console.log('event.target.value ', event.target.value);
    this.fetchUserTeamsByBegginingDate(event.target.value);
  }
  onChangeEndingDate(event: any) {
    console.log('event.target.value ', event.target.value);
    this.fetchUserTeamsByEndingDate(event.target.value);
  }
  updatePage(event: number) {
    // console.log('Evento updatePage llamado: ', event);
    this.desde = event;
    this.fetchTeamUsers();
  }

  /**
   * Formats the date to mm/dd/yyyy
   * @param date : Date
   * @returns string
   */
  getFormatedDate(date: Date): string {
    let fechaFormateada: string = this.datePipe.transform(
      new Date(date),
      'yyyy-MM-dd'
    );
    let arrayDatefechaFormateada: string[] = fechaFormateada.split('-');
    let ultimoDigitoFecha: number = Number(arrayDatefechaFormateada[2]) + 1;
    arrayDatefechaFormateada[2] = ultimoDigitoFecha.toString();
    fechaFormateada = arrayDatefechaFormateada.join('-');
    return fechaFormateada;
  }
}
