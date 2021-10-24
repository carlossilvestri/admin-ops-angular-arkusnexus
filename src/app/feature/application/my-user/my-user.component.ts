import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Level } from 'src/app/core/interfaces/level-requests.interface';
import { Role } from 'src/app/core/interfaces/role-requests.interface';
import { UpdateUserRequest, UpdateUserResponse, User } from 'src/app/core/interfaces/user-requests.interface';
import { LevelService } from 'src/app/shared/services/level/level.service';
import { RoleService } from 'src/app/shared/services/role/role.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HelpersService } from 'src/app/shared/services/helpers/helpers.service';

@Component({
  selector: 'app-my-user',
  templateUrl: './my-user.component.html',
  styleUrls: ['./my-user.component.scss']
})
export class MyUserComponent implements OnInit {
  /* =============================
                VARIABLES
     =============================
  */
     user: User;
     password: string = '';
     roles: Role[];
     levels: Level[];
     forma: FormGroup;
  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    public roleService: RoleService,
    public levelService: LevelService,
    public router: Router,
    public helpersService: HelpersService
  ) { }

  ngOnInit(): void {
    this.fetchFields();
    this.initForm();
  }
  initForm() {
    this.forma = this.fb.group({
      name: [this.user.name,[ Validators.required, Validators.minLength(2)]],
      email: [
        this.user.email,
        [
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          Validators.required,
          Validators.email,
        ],
      ],
      id_role_f: [this.user.id_role_f, [Validators.required]],
      id_english_level_f: [this.user.id_english_level_f, [Validators.required]],
      link_cv: [this.user.link_cv],
      technical_knoledge: [this.user.technical_knoledge, [Validators.required]],
    });
  }
  fetchFields() : void {
    this.fetchRoles();
    this.fetchLevels();
    this.fetchMyUser();
  }
  fetchRoles() : void {
    this.roles = this.roleService.getRolesByLocalStorage();
  }
  fetchMyUser() : void{
    this.user = this.userService.getUserByLocalStorage();
  }
  fetchLevels() : void{
    this.levels = this.levelService.getRolesByLocalStorage();
  }
  onChangeRandioButton(event: any) {
    this.user.Level.id_level = event.target.value;
  }
  updateUser() : void {
    console.log("this.forma ", this.forma);
    console.log("this.user ", this.user);

    // Resaltar errores si los hay
    this.forma.markAllAsTouched();
    // Revisar si el formulario es valido.
   
    if (this.forma.invalid) {
      return;
    }
    
    // Es valido. Crear el objeto.
    const userToUpdate: UpdateUserRequest = {
      id_user: this.user.id_user,
      email: this.forma.value.email,
      password: this.password,
      name: this.forma.value.name,
      link_cv: this.forma.value.link_cv,
      is_active_user: true,
      id_english_level_f: this.user.Level.id_level,
      id_role_f: this.forma.value.id_role_f,
      technical_knoledge: this.forma.value.technical_knoledge,
      token: this.helpersService.getFromLocalStorage('token')
    };
    // For debugging.
    // console.log('userToUpdate ', userToUpdate);
    // return;
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
        // Editar mediante el servicio.
        this.userService.editUser(userToUpdate).subscribe();
      }
    });
  }
  campoNoEsValido(campo: string): boolean {
    return this.helpersService.campoNoEsValido(campo, this.forma);
  }


}
