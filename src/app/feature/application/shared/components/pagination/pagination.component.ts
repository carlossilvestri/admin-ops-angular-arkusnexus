import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {

@Input('page') pagina: number;
  @Input() events: Observable<void>;
  @Output() changePage: EventEmitter<number> = new EventEmitter();
  private eventsSubscription: any;
  constructor() { }

  ngOnInit(): void {
    console.log('page ', this.pagina);
    if(this.events){
      this.eventsSubscription = this.events.subscribe(() => {this.pagina = 0})
    }
  }
  ngOnDestroy() {
    if(this.eventsSubscription){
          this.eventsSubscription.unsubscribe();
    }
  }
  cambiarPagina(aumentar: boolean){
    if(aumentar){
      this.pagina =  this.pagina + 10;
    }else if(this.pagina > 0){
      this.pagina = this.pagina - 10;
    }
    this.changePage.emit(this.pagina);
    console.log('this.pagina ', this.pagina);
  }

}
