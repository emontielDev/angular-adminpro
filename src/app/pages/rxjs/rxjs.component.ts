import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs/Rx';
// import { Observable } from 'rxjs/Observable'; // Mas ligero para producción

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  // Permitir las suscripciones
  subscription: Subscription;

  constructor() {

    this.subscription = this.regresarObservable()
        // .retry(2)
        .subscribe(numero => {
      console.log('Subs...', numero);
    },
    error => {
      console.log('Error...', error);
    }, () => {
      console.log('El observador finalizó de manera correcta.');
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    console.log('La pagina se va a cerrar.');
    this.subscription.unsubscribe();
  }

  regresarObservable(): Observable<any> {
    return new Observable(observer => {
      let contador = 0;
      let intervalo = setInterval( () => {
        contador++;
        let salida = {
          valor: contador
        };
        observer.next(salida);
        // if (contador === 3) {
        //   observer.complete();
        //   clearInterval(intervalo);
        // }

        // if (contador === 2) {
        //   observer.error('Auxilioooooooo....');
        // }
      }, 500);
    })
    .map( (response: any) => {
      return response.valor;
    })
    .filter( (valor, index) => {
      if (valor % 2 === 1) {
        // Impar
        return true;
      } else {
        // Par
        return false;
      }
    });
  }
}
