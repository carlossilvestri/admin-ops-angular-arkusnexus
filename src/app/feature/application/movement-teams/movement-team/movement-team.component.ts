import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamService } from 'src/app/shared/services/team/team.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HelpersService } from '../../../../shared/services/helpers/helpers.service';
import { Team } from 'src/app/core/interfaces/team-requests.interface';
import { UserService } from '../../../../shared/services/user/user.service';
import { User } from '../../../../core/interfaces/user-requests.interface';
import { TeamUserService } from '../../../../shared/services/team_user/team-user.service';
import {
  CreateTeamUserRequest,
  CreateTeamUserResponse,
  EditTeamUserRequest,
  EditTeamUserResponse,
  TeamUser,
} from '../../../../core/interfaces/team_user-requests.interface';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movement-team',
  templateUrl: './movement-team.component.html',
  styleUrls: ['./movement-team.component.scss'],
})
export class MovementTeamComponent implements OnInit {
  loadingUsers: boolean = false;
  loadingTeams: boolean = false;
  loadingTeamUser: boolean = false;
  teams: Team[];
  users: User[];
  id_team_user: number = 0;
  forma: FormGroup;
  team_user: TeamUser;

  constructor(
    private fb: FormBuilder,
    public teamService: TeamService,
    public userService: UserService,
    public teamUserService: TeamUserService,
    public router: Router,
    private route: ActivatedRoute,
    public helpersService: HelpersService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.id_team_user = this.route.snapshot.params['id'];
    console.log('id_team_user ', this.id_team_user);
    this.fetchFields();
  }
  fetchFields(): void {
    this.fetchTeams();
    this.fetchUsers();
    if (this.id_team_user) {
      this.fetchTeamUser();
    } else {
      this.initFormCreate();
    }
  }

  // TODO - Get TeamUser by id.
  fetchTeamUser(): void {
    this.loadingTeamUser = true;
    this.teamUserService
      .getTeamUserById(this.id_team_user)
      .subscribe((resp) => {
        this.team_user = resp.team_user;
        console.log('team_user ', this.team_user);
        this.initFormEdit();
      });
  }
  initFormEdit() {
    this.loadingTeamUser = true;
    this.forma = this.fb.group({
      id_user_f: [
        this.team_user.id_user_f,
        [Validators.required, Validators.minLength(1)],
      ],
      id_team_f: [
        this.team_user.id_team_f,
        [Validators.required, Validators.minLength(1)],
      ],
      beggining_date: [
        this.getFormatedDate(this.team_user.beggining_date),
        [Validators.required, Validators.minLength(2)],
      ],
      ending_date: [
        this.getFormatedDate(this.team_user.ending_date),
        [Validators.required, Validators.minLength(2)],
      ],
    });
    this.loadingTeamUser = false;
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
  fetchTeams(): void {
    this.loadingTeams = true;
    this.teamService.getTeams().subscribe((resp) => {
      this.teams = resp.teams;
      this.loadingTeams = false;
    });
  }
  fetchUsers(): void {
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

  updateTeamUser(): void {
    console.log('this.forma ', this.forma);
    // Resaltar errores si los hay
    this.forma.markAllAsTouched();
    // Revisar si el formulario es valido.
    if (this.forma.invalid) {
      return;
    }
    Swal.fire({
      title: '¿Estás seguro/a?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.isEditTeamUserById()) {
          // Es valido. Crear el objeto.
          const teamUserToEdit: EditTeamUserRequest = {
            id_team_user: this.team_user.id_team_user,
            beggining_date: this.forma.value.beggining_date,
            ending_date: this.forma.value.ending_date,
            id_user_f: this.forma.value.id_user_f,
            id_team_f: this.forma.value.id_team_f,
          };
          // For debugging.
          console.log('teamUserToEdit ', teamUserToEdit);
          // Editar mediante el servicio.
          this.teamUserService
            .editTeamUser(teamUserToEdit)
            .subscribe((resp: EditTeamUserResponse) => {
              console.log('resp ', resp);
              this.router.navigate(['/application/movement-teams']);
            });
        } else {
          // Es valido. Crear el objeto.
          const teamUserToCreate: CreateTeamUserRequest = {
            beggining_date: this.forma.value.beggining_date,
            ending_date: this.forma.value.ending_date,
            id_user_f: this.forma.value.id_user_f,
            id_team_f: this.forma.value.id_team_f,
          };
          // For debugging.
          console.log('teamUserToCreate ', teamUserToCreate);
          // Editar mediante el servicio.
          this.teamUserService
            .createTeamUser(teamUserToCreate)
            .subscribe((resp: CreateTeamUserResponse) => {
              console.log('resp ', resp);
              this.router.navigate(['/application/movement-teams']);
            });
        }
      }
    });
  }

  /**
   * This function tells you if the variable id_user has a value.
   * @returns boolean
   */
  isEditTeamUserById(): boolean {
    let editOtherTeamUser: boolean = false;
    if (this.id_team_user) {
      editOtherTeamUser = true;
    } else {
      editOtherTeamUser = false;
    }
    return editOtherTeamUser;
  }
}
