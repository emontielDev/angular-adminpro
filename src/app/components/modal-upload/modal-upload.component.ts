import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})

export class ModalUploadComponent implements OnInit {
  @ViewChild('img')
  private inputFile: ElementRef;

  protected imgSubir: File;
  protected imgTemporal: string;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    protected _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.imgSubir = null;
    this.imgTemporal = null;
    this._modalUploadService.ocultarModal();
  }

  protected changeImg(event) {
    let file = event.target.files[0] as File;
    if (!file) {
      this.imgTemporal = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {
      swal('Archivo no permitido', 'El archivo seleccionado no es una imagen.', 'warning');
      return;
    }

     this.imgSubir = file;

    let fileReader = new FileReader();
    fileReader.onload = (res: any) => {
      this.imgTemporal = res.target.result;
    };

    fileReader.readAsDataURL(file);
  }

  protected openFile() {
    this.inputFile.nativeElement.click();
  }

  protected subirImagen() {
    this._subirArchivoService.subirArchivo(this.imgSubir, this._modalUploadService.tipo, this._modalUploadService.id)
    .subscribe(res => {
      this.cerrarModal();
      this._modalUploadService.notificacion.emit(res);
    }, err => {
      this._modalUploadService.notificacion.error(err);
    });
  }

}
