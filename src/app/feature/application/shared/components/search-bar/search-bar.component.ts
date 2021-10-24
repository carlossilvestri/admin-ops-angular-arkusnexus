import { Component, OnInit, Input, Output,  EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input() textBar: string;
  @Output() changeText: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  sendTextToParent(text: any){
    this.changeText.emit(text);
  }

}
