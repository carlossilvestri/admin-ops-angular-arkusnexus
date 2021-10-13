import { NgModule } from '@angular/core';
// Angular Material
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  exports: [
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule
  ],
})
export class MaterialModule {}
