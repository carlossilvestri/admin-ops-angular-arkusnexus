import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-application-bar',
  templateUrl: './application-bar.component.html',
  styleUrls: ['./application-bar.component.scss']
})
export class ApplicationBarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  onCloseSession() : void{
    this.router.navigate(['/']);
  }

}
