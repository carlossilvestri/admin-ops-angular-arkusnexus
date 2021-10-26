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
import { Account, UpdateIsActiveAccountRequest } from '../../../core/interfaces/account-requests.interface';
import { AccountService } from '../../../shared/services/account/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  /* =============================
                VARIABLES
     =============================
  */
  accounts: Account[];
  desde: number = 0;
  loadingAccounts: boolean = false;
  thereWasAnError: boolean = false;
  constructor(
    public router: Router,
    public accountService: AccountService,
    public helpersService: HelpersService
  ) {}

  ngOnInit(): void {
    this.fetchAccounts();
  }
  /**
   * Get the accounts, calling the API.
   */
  fetchAccounts() : void{
    this.loadingAccounts = true;
    this.accountService.getAccounts(this.desde).subscribe(
      (resp) => {
        this.loadingAccounts = false;
        this.thereWasAnError = false;
        this.accounts = resp.accounts;
        console.log('resp ', resp);
      },
      (err) => {
        console.log('err ', err);
        this.loadingAccounts = false;
        this.thereWasAnError = true;
      }
    );
  }
  /**
   * searchAccountByName() : void
   * Search accounts by name. It fills variable accounts.
   * @param event : string
   * @return void
   */
   searchAccountByName(event: string): void {
    console.log('event ', event);
    this.loadingAccounts = true;
    this.accountService.getAccountsByName(this.desde, event).subscribe(
      (resp) => {
        this.loadingAccounts = false;
        this.thereWasAnError = false;
        this.accounts = resp.accounts;
        console.log('resp ', resp);
      },
      (err) => {
        console.log('err ', err);
        this.loadingAccounts = false;
        this.thereWasAnError = true;
      }
    );
  }
  updatePage(event: number) {
    // console.log('Evento updatePage llamado: ', event);
    this.desde = event;
    this.fetchAccounts();
  }

    /**
   * updateIsActiveAccount() Update the fiel is_active of a
   * @param is_active : boolean
   * @return void
   */
     updateIsActiveAccount(account: Account): void {
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
          const accountToUpdate: UpdateIsActiveAccountRequest = {
            is_active: !account.is_active,
            id_account: account.id_account,
            token: this.helpersService.getFromLocalStorage('token'),
          };
          console.log('accountToUpdate ', accountToUpdate);
          // Editar mediante el servicio.
          this.accountService.updateIsActiveAccount(accountToUpdate).subscribe((resp) => {
            this.fetchAccounts();
          });
        }
      });
    }
}
