import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Level } from 'src/app/core/interfaces/level-requests.interface';
import { LevelService } from 'src/app/shared/services/level/level.service';
import { UserService } from 'src/app/shared/services/user/user.service';
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
  constructor(private fb: FormBuilder, public userService: UserService, public levelService: LevelService) {}

  ngOnInit(): void {
    this.initFields();
  }
  initFields(): void {
    this.initForm();
    this.fetchLevelsByLocalStorage();
  }
  initForm() {
    this.forma = this.fb.group({
      name: [Validators.required, Validators.minLength(2)],
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
  fetchLevelsByLocalStorage() : void{
    this.levels = this.levelService.getRolesByLocalStorage();
    if(!this.levels){
      this.fetchLevels();
    }
  }
  fetchLevels() : void {
    this.levelService.getLevels().subscribe(
      (resp) => {
        this.levels = resp.levels;
      },
      /*
      (err) => {
        console.log('err ', err);
        this.loadingUsers = false;
        this.thereWasAnError = true;
      }
      */
    );
  }
}
