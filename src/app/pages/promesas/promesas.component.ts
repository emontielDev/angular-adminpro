import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    this.contador()
    .then(mensaje => {
      console.log('Termino', mensaje);
    })
    .catch(error => {
      console.error('Error en la promesa.', error);
    });
  }

  ngOnInit() {
  }

  contador(): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      let contador = 0;
      let interval = setInterval( () => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          resolve(true);
          // resolve('OK!');
          // reject('Simplemente un error');
          clearInterval(interval); // Limpiar interval
        }
      }, 1000);
    });
  }

}
