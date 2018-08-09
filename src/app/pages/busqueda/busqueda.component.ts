import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedaService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _busquedaService: BusquedaService
  ) { }

  ngOnInit() {
    this._activatedRoute.params
    .subscribe(params => {
      this.buscar(params.q);
    });
  }

  buscar(q: string) {
    this._busquedaService.buscar(q)
    .subscribe((res: any) => {
      this.hospitales = res.hospitales;
      this.medicos = res.medicos;
      this.usuarios = res.usuarios;
    });
  }

}
