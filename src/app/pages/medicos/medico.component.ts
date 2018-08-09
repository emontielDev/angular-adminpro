import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { HospitalService, MedicoService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', null, '');
  hospital: Hospital = new Hospital('', '', '');

  constructor(
    private _medicoService: MedicoService,
    private _hospitalService: HospitalService,
    private _modalUploadService: ModalUploadService,
    private _router: Router,
    public _activateRoute: ActivatedRoute
  ) {
    _activateRoute.params.subscribe(params => {
      let id = params['id'];

      if (id !== 'crear') {
        this.cargarMedico(id);
      }
    });
   }

  ngOnInit() {
    this.medico.hospital = this.hospital;
    this.cargarHospitales();

    this._modalUploadService.notificacion.subscribe(res => {
      this.medico.img = res.medicos.img;
    });
  }

  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id)
    .subscribe((res: any) => {
      this.medico = res.medico;
      this.cambioHospital(this.medico.hospital._id);
    });
  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }

  cambioHospital(id) {
    if (!id) {
      this.hospital = new Hospital('', '', '');
      return;
    }
    this.hospital = (this.hospitales.filter(o => o._id === id)[0] || this.medico.hospital);
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales(-1)
    .subscribe((res) => this.hospitales = res['hospitales']);
  }

  guardar(f: NgForm) {
    if (f.invalid) {
      return;
    }

    if (this.medico._id.length > 0 ) {
      this._medicoService.actualizar(this.medico._id, this.medico.nombre, this.medico.hospital._id)
      .subscribe((res: any) => {
        swal('Médico actualizado', res.medico.nombre, 'success');
      });
    } else {
    this._medicoService.guardar(this.medico._id, this.medico.nombre, this.medico.hospital._id)
    .subscribe((res: any) => {
      this.medico._id = res.medico._id;
      this._router.navigate(['/medico', res.medico._id]);
      swal('Médico creado', res.medico.nombre, 'success');
    });
  }
  }
}
