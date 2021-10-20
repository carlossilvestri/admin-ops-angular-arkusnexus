import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  forma: FormGroup;
  constructor(private fb: FormBuilder, public userService: UserService) {}

  ngOnInit(): void {
    this.initFields();
  }
  initFields(): void {
    this.initForm();
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
}
