import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HelpersService } from '../helpers/helpers.service';
import {
  CreateAccountRequest,
  CreateAccountResponse,
  EditAccountRequest,
  EditAccountResponse,
  GetAccountByIdResponse,
  GetAccountsByNameResponse,
  GetAccountsResponse,
  UpdateIsActiveAccountRequest,
  UpdateIsActiveAccountResponse,
} from 'src/app/core/interfaces/account-requests.interface';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  // Variables
  public url = environment.baseUrl;
  constructor(
    public http: HttpClient,
    public router: Router,
    public helpers: HelpersService
  ) {}

  /**
   * Create a new account.
   * @param account: CreateAccountRequest
   * @returns Observable<CreateaccountResponse>
   */
  createAccount(
    account: CreateAccountRequest
  ): Observable<CreateAccountResponse> {
    const url = `${this.url}/account`;
    return this.http.post<CreateAccountResponse>(url, account).pipe(
      map((resp: CreateAccountResponse) => {
        Swal.fire(
          'Correcto',
          'Cuenta creada ' + account.account_name,
          'success'
        );
        return resp;
      })
    );
  }

  /**
   * Edit all fields of the account.
   * @param dataEditAccount: EditAccountRequest
   * @returns Observable<EditAccountResponse>
   */
  editAccount(
    dataEditAccount: EditAccountRequest
  ): Observable<EditAccountResponse> {
    let url = `${this.url}/account/${dataEditAccount.id_account}`;
    return this.http.put<EditAccountResponse>(url, dataEditAccount).pipe(
      map((resp: EditAccountResponse) => {
        Swal.fire('Correcto', 'Se ha editado correctamente.', 'success');
        return resp;
      })
    );
  }
  /**
   * Update is_active field of a specific account.
   * @param dataEditAccount: UpdateIsActiveAccountRequest
   * @returns Observable<UpdateIsActiveAccountResponse>
   */
  updateIsActiveAccount(
    dataEditAccount: UpdateIsActiveAccountRequest
  ): Observable<UpdateIsActiveAccountResponse> {
    const url = `${this.url}/disable-account/${dataEditAccount.id_account}`;
    return this.http
      .patch<UpdateIsActiveAccountResponse>(url, dataEditAccount)
      .pipe(
        map((resp: UpdateIsActiveAccountResponse) => {
          Swal.fire('Correcto', 'Acción completada.', 'success');
          return resp;
        })
      );
  }
  /**
   * Get a list of accounts registered on the system.
   * @param desde: number
   * @returns Observable<GetAccountsResponse>
   */
  getAccounts(desde: number): Observable<GetAccountsResponse> {
    const url = `${this.url}/account?desde=${desde}`;
    return this.http.get<GetAccountsResponse>(url).pipe(
      map((resp: GetAccountsResponse) => {
        return resp;
      })
    );
  }
  /**
   * Get a list of accounts by name and is_active = true
   * @param desde: number, account_name: string
   * @returns Observable<GetAccountsByNameResponse>
   */
  getAccountsByName(
    desde: number,
    account_name: string
  ): Observable<GetAccountsByNameResponse> {
    const url = `${this.url}/account-by-name?desde=${desde}&account_name=${account_name}`;
    return this.http.get<GetAccountsByNameResponse>(url).pipe(
      map((resp: GetAccountsByNameResponse) => {
        return resp;
      })
    );
  }
  /**
   * Get a list of accounts registered on the system.
   * @param id_account: number
   * @returns Observable<GetAccountByIdResponse>
   */
  getAccountById(id_account: number): Observable<GetAccountByIdResponse> {
    const url = `${this.url}/account/${id_account}`;
    return this.http.get<GetAccountByIdResponse>(url).pipe(
      map((resp: GetAccountByIdResponse) => {
        return resp;
      })
    );
  }
}
