import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movement-teams',
  templateUrl: './movement-teams.component.html',
  styleUrls: ['./movement-teams.component.scss']
})
export class MovementTeamsComponent implements OnInit {

  filterBy: string = 'TEAM';
  constructor() { }

  ngOnInit(): void {
  }
  changeFilter(text : string): void {
    this.filterBy = text;
  }
  onChangeRadioButton(event: any) {
    this.changeFilter(event.target.value);
  }

}
