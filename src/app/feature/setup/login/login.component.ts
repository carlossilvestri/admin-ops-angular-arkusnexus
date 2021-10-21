import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../shared/services/user/user.service';
import { LoginUserRequest } from '../../../core/interfaces/user-requests.interface';
import { RoleService } from '../../../shared/services/role/role.service';
import { LevelService } from 'src/app/shared/services/level/level.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  forma: FormGroup;
  constructor(
    public router: Router,
    private fb: FormBuilder,
    public userService: UserService,
    public roleService: RoleService,
    public levelService: LevelService
  ) {}

  ngOnInit(): void {
    this.initFields();
  }
  initFields(): void {
    this.initForm();
  }
  onLogin() {
    // Resaltar errores si los hay
    this.forma.markAllAsTouched();
    // For debugging.
    console.log('this.forma ', this.forma);
    // Check if the form is invalid:
    if (this.forma.invalid) {
      return;
    }
    // It's valid, create the object.
    const loginData: LoginUserRequest = {
      email: this.forma.value.email,
      password: this.forma.value.password,
    };
    const loginCall = this.userService.login(loginData);
    const getRoles = this.roleService.getRoles();
    const getLevels = this.levelService.getLevels();
    // Hacer las 2 llamadas al mismo tiempo.
    forkJoin([loginCall, getRoles, getLevels]).subscribe((results) => {
      // For debugging.
      console.log('results  ', results );
      this.router.navigate(['/application/my-user']);
    });
  }
  initForm() {
    this.forma = this.fb.group({
      email: [
        '',
        [
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          Validators.required,
          Validators.email,
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  /* Getters */
  get noValidEmail(): boolean {
    return this.forma.get('email').invalid && this.forma.get('email').touched;
  }
  get passNoValid(): boolean {
    return (
      this.forma.get('password').invalid && this.forma.get('password').touched
    );
  }
}
