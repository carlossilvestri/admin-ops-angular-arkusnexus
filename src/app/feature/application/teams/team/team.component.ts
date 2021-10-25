import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HelpersService } from 'src/app/shared/services/helpers/helpers.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Team } from 'src/app/core/interfaces/team-requests.interface';
import { TeamService } from 'src/app/shared/services/team/team.service';
import { EditTeamByIdRequest, CreateATeamRequest } from '../../../../core/interfaces/team-requests.interface';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  /* =============================
                VARIABLES
     =============================
  */
  team: Team;
  id_team: number = 0;
  forma: FormGroup;
  loadingTeam: boolean = false;

  constructor(
    private fb: FormBuilder,
    public teamService: TeamService,
    public router: Router,
    private route: ActivatedRoute,
    public helpersService: HelpersService
  ) {}

  ngOnInit(): void {
    this.id_team = this.route.snapshot.params['id'];
    this.fetchFields();
  }

  fetchFields(): void {
    if (this.id_team) {
      this.fetchTeam();
    } else {
      this.initFormCreate();
    }
  }
  fetchTeam(): void {
    this.loadingTeam = true;
    this.teamService.getTeamById(this.id_team).subscribe((resp) => {
      this.team = resp.team;
      this.initFormEdit();
    });
  }
  initFormEdit() {
    this.forma = this.fb.group({
      name: [this.team.name, [Validators.required, Validators.minLength(2)]],
    });
    this.loadingTeam = false;
  }
  initFormCreate() {
    this.forma = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
    });
    this.loadingTeam = false;
  }
  /**
   * This function tells you if the variable id_user has a value.
   * @returns boolean
   */
  isEditTeamById(): boolean {
    let editOtherUser: boolean = false;
    if (this.id_team) {
      editOtherUser = true;
    } else {
      editOtherUser = false;
    }
    return editOtherUser;
  }
  updateTeam(): void {
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
        if (this.isEditTeamById()) {
          // Edit team.
          const teamToUpdate: EditTeamByIdRequest = {
            id_team: this.team.id_team,
            name: this.forma.value.name,
          };
          this.teamService.editTeam(teamToUpdate).subscribe(
            (resp) => {
              this.router.navigate(['/application/teams']);
            }
          );
        } else {
          // Create team.
          const teamToCreate: CreateATeamRequest = {
            name: this.forma.value.name
          };
          this.teamService.createTeam(teamToCreate).subscribe(
            (resp) => {
              this.router.navigate(['/application/teams']);
            }
          );
        }
      }
    });
  }
}
