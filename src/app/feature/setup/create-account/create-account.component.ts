import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Level } from 'src/app/core/interfaces/level-requests.interface';
import { CreateUserRequest } from 'src/app/core/interfaces/user-requests.interface';
import { LevelService } from 'src/app/shared/services/level/level.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import Swal from 'sweetalert2';
import { HelpersService } from '../../../shared/services/helpers/helpers.service';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: [
    './create-account.component.scss',
    '../login/login.component.scss',
  ],
})
export class CreateAccountComponent implements OnInit {
  /* =============================
                VARIABLES
     =============================
  */
  levels: Level[];
  forma: FormGroup;
  userCreateRequest: CreateUserRequest;
  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    public levelService: LevelService,
    public helpersService: HelpersService
  ) {}

  ngOnInit(): void {
    this.initFields();
  }
  initFields(): void {
    this.initForm();
    this.fetchLevelsByLocalStorage();
  }
  initForm() {
    this.forma = this.fb.group({
      name: ['',[ Validators.required, Validators.minLength(2)]],
      email: [
        '',
        [
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          Validators.required,
          Validators.email,
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(3)]],
      id_english_level_f: ['', [Validators.required]],
      link_cv: [''],
      technical_knoledge: ['', [Validators.required]],
    });
  }
  fetchLevelsByLocalStorage(): void {
    this.levels = this.levelService.getRolesByLocalStorage();
    if (!this.levels) {
      this.fetchLevels();
    }
  }
  fetchLevels(): void {
    this.levelService.getLevels().subscribe(
      (resp) => {
        this.levels = resp.levels;
      }
      /*
      (err) => {
        console.log('err ', err);
        this.loadingUsers = false;
        this.thereWasAnError = true;
      }
      */
    );
  }
  /**
   * onCreateAccount(): void
   * Create a new account. Validate if fields required are valid or not.
   */
  onCreateAccount(): void {
    // Resaltar errores si los hay
    this.forma.markAllAsTouched();
    // Revisar si el formulario es valido.
    if (this.forma.invalid) {
      return;
    }
    // Es valido. Crear el objeto. this.forma.value.nameM
    this.userCreateRequest = {
      email:              this.forma.value.email,
      technical_knoledge: this.forma.value.technical_knoledge,
      name:               this.forma.value.name,
      link_cv:            this.forma.value.link_cv,
      is_active_user:     true,
      id_english_level_f: this.forma.value.id_english_level_f,
      id_role_f:          1 // id_role_f 1 es el que tiene NORMAL 
    };
    // For debugging.
    console.log('userCreateRequest ', this.userCreateRequest);
    console.log('this.forma ', this.forma);
    Swal.fire({
      title: '¿Estás seguro?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
    }).then((result) => {
      if (result.isConfirmed) {
        this.createAccount(this.userCreateRequest);
      }
    });
  }

  campoNoEsValido(campo: string): boolean {
    return this.helpersService.campoNoEsValido(campo, this.forma);
  }
    // Crear medicamento.
  createAccount(createUserAccount: CreateUserRequest) {
    this.userService.createUser(createUserAccount).subscribe((resp) => {
      console.log('resp ', resp);
    });
  }
}
