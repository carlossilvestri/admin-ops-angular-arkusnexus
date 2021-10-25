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
import { Account } from '../../../core/interfaces/account-requests.interface';
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

  ngOnInit(): void {}
}
