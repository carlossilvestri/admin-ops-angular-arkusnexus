import { Component, OnInit } from '@angular/core';
import { Account, EditAccountRequest, CreateAccountRequest } from '../../../../core/interfaces/account-requests.interface';
import Swal from 'sweetalert2';
import { HelpersService } from 'src/app/shared/services/helpers/helpers.service';
import { AccountService } from '../../../../shared/services/account/account.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamService } from '../../../../shared/services/team/team.service';
import { Team } from '../../../../core/interfaces/team-requests.interface';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  /* =============================
                VARIABLES
     =============================
  */
     account: Account;
     teams: Team[];
     id_account: number = 0;
     forma: FormGroup;
     loadingAccount: boolean = false;
     loadingTeam: boolean = false;
   
     constructor(
       private fb: FormBuilder,
       public accountService: AccountService,
       public teamService: TeamService,
       public router: Router,
       private route: ActivatedRoute,
       public helpersService: HelpersService
     ) {}

  ngOnInit(): void {
    this.id_account = this.route.snapshot.params['id'];
    console.log('id_account ', this.id_account);
    this.fetchFields();
  }

  fetchFields(): void {
    this.fetchTeams();
    if (this.id_account) {
      this.fetchAccount();
    } else {
      this.initFormCreate();
    }
  }

  fetchAccount(): void {
    this.loadingAccount = true;
    this.accountService.getAccountById(this.id_account).subscribe((resp) => {
      this.account = resp.account;
      console.log("account ", this.account);
      this.initFormEdit();
    });
  }
  initFormEdit() {
    this.forma = this.fb.group({
      account_name: [this.account.account_name, [Validators.required, Validators.minLength(2)]],
      id_team: [this.account.id_team_f, [Validators.required]],
      name_client: [this.account.name_client, [Validators.required, Validators.minLength(2)]],
      responsible_operations_name: [this.account.responsible_operations_name, [Validators.required, Validators.minLength(2)]],
    });
    this.loadingAccount = false;
  }
  initFormCreate() {
    this.forma = this.fb.group({
      account_name: ['', [Validators.required, Validators.minLength(2)]],
      id_team: [0, [Validators.required, Validators.min(1)]],
      name_client: ['', [Validators.required, Validators.minLength(2)]],
      responsible_operations_name: ['', [Validators.required, Validators.minLength(2)]],
    });
    this.loadingAccount = false;
  }
  fetchTeams() : void {
    this.loadingTeam = true;
    this.teamService.getTeams().subscribe((resp) => {
      this.teams = resp.teams;
      this.loadingTeam = false;
      // this.initFormEdit();
    });
  }
    /**
   * This function tells you if the variable id_user has a value.
   * @returns boolean
   */
     isEditAccountById(): boolean {
      let editAccount: boolean = false;
      if (this.id_account) {
        editAccount = true;
      } else {
        editAccount = false;
      }
      return editAccount;
    }


    updateTeam(): void {
      // Resaltar errores si los hay
      this.forma.markAllAsTouched();
      // Revisar si el formulario es valido.
  
      if (this.forma.invalid) {
        return;
      }
      console.log('this.forma ', this.forma);
      console.log('this.account ', this.account);
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
          if (this.isEditAccountById()) {
            // Edit team.
            const accountToUpdate: EditAccountRequest = {
              id_account:                  this.id_account,
              is_active:                   this.account.is_active,
              id_team_f:                   this.forma.value.id_team,
              responsible_operations_name: this.forma.value.responsible_operations_name,
              name_client:                 this.forma.value.name_client,
              account_name:                this.forma.value.account_name,
            };
            this.accountService.editAccount(accountToUpdate).subscribe(
              (resp) => {
                this.router.navigate(['/application/accounts']);
              }
            );
          } else {
            // Create team.
            const accountToCreate: CreateAccountRequest = {
              is_active:                   true,
              id_team_f:                   this.forma.value.id_team,
              responsible_operations_name: this.forma.value.responsible_operations_name,
              name_client:                 this.forma.value.name_client,
              account_name:                this.forma.value.account_name,
            };
            this.accountService.createAccount(accountToCreate).subscribe(
              (resp) => {
                this.router.navigate(['/application/accounts']);
              }
            );
          }
        }
      });
    }
    campoNoEsValido(campo: string): boolean {
      return this.helpersService.campoNoEsValido(campo, this.forma);
    }


}
