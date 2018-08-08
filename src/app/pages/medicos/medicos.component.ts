import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  cargando: Boolean = false;
  medicos: Medico[] = [];
  total = 0;
  offset = 0;

  constructor(
    private _medicosService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
    // this._modalUploadService.notificacion.subscribe(res => {
    //   this.cargarHospitales();
    // });
  }

  buscarMedicos(texto: string) {
    if (texto.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;
    this._medicosService.buscarMedico(texto)
    .subscribe(res => {
      this.cargando = false;
      this.medicos = res['medicos'];
    });
  }

  cambiarPagina(valor: number) {
    let offsetTemporal = this.offset + valor;
    if (offsetTemporal >= this.total || offsetTemporal < 0) {
      return;
    }

    this.offset += valor;
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.cargando = true;
    this._medicosService.cargarMedicos(this.offset)
    .subscribe((res) => {
      this.total = res['total'];
      this.medicos = res['medicos'];
      this.cargando = false;
    });
  }

  eliminar(medico: Medico) {
    this._medicosService.eliminar(medico._id)
    .subscribe((res) => {
      this.cargarMedicos();
    });
  }
}
