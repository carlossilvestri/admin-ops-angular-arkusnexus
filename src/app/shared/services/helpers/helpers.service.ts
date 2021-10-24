import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }
  /*
  Doc: saveOnLocalStorage. Guarda cualquier campo con su respectivo obj en el localstorage.
  Param: campo: string, objeto: any
  */
  saveOnLocalStorage(campo: string, objeto: any): void {
    const objEnString: string = JSON.stringify(objeto);
    localStorage.setItem(campo, objEnString);
  }
  /*
  Doc: removeFieldLocalStorage. Eliminar cualquier campo del localstorage.
  Param: campoAEliminar: string
  */
  removeFieldLocalStorage(campoAEliminar: string): void {
    localStorage.removeItem(campoAEliminar);
  }
  /*
  Doc: getFromLocalStorage. Carga en una variable cualquier campo del localstorage.
  Param: campoASolicitar: string
  */
  getFromLocalStorage(campoASolicitar: string) {
    var campo: any;
    if (localStorage.getItem(campoASolicitar)) {
      campo = JSON.parse(localStorage.getItem(campoASolicitar));
    } else {
      campo = null;
    }
    return campo;
  }
   /*
  Doc: Dice si el campo es invalido valiendose de cualquier campo del array [Validator]
  Parametros: campo: string, forma: FormGroup
  Regresa un booleano.
  */
  campoNoEsValido(campo: string, forma: FormGroup): boolean {
    return forma.controls[campo].errors && forma.controls[campo].touched;
  }
  
}
