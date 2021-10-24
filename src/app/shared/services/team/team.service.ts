import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HelpersService } from '../helpers/helpers.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  // Variables
  public url = environment.baseUrl;
  constructor(
    public http: HttpClient,
    public router: Router,
    public helpers: HelpersService
  ) {}
}
