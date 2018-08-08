import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  cargando: Boolean = false;
  hospitales: Hospital[] = [];
  total = 0;
  offset = 0;

  constructor(
    public _hospitalService: HospitalService,
    private _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(res => {
      this.cargarHospitales();
    });
  }

  actualizar(hospital: Hospital) {
    console.log(hospital);
    this._hospitalService.actualizarNombre(hospital._id, hospital.nombre)
    .subscribe((res) => {
      this.cargarHospitales();
    });
  }

  buscarHospitales(texto: string) {
    if (texto.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;
    this._hospitalService.buscarHospital(texto)
    .subscribe(res => {
      this.cargando = false;
      this.hospitales = res['hospitales'];
    });
  }

  cambiarPagina(valor: number) {
    let offsetTemporal = this.offset + valor;
    if (offsetTemporal >= this.total || offsetTemporal < 0) {
      return;
    }

    this.offset += valor;
    this.cargarHospitales();
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales(this.offset)
    .subscribe((res) => {
      this.total = res['total'];
      this.hospitales = res['hospitales'];
      this.cargando = false;
    });
  }

  crearHospital () {
    swal({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string) => {
      if (!valor || valor.length === 0) {
      return;
      }

      this._hospitalService.crearHospital(valor)
      .subscribe(() => this.cargarHospitales());
    });
  }

  eliminar(hospital: Hospital) {
    this._hospitalService.eliminarHospital(hospital._id)
    .subscribe((res) => {
      this.cargarHospitales();
    });
  }

  mostrarModal(hospital: Hospital) {
    this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }

}
