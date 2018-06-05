import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';

@Injectable()
 export class UsuarioLocalStorage {

    public id: string;
    public token: string;
    public usuario: Usuario;

    constructor() {
        this.cargar();
    }

    cargar() {
        if (localStorage.getItem('token')) {
           this.id = localStorage.getItem('id');
           this.token = localStorage.getItem('token');
           this.usuario = JSON.parse(localStorage.getItem('usuario'));
        } else {
            this.id = '';
            this.token = '';
            this.usuario = null;
        }
    }

    eliminar() {
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
    }

    guardar(id: string, token: string, usuario: Usuario) {
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }

    estaAutenticado(): Boolean {
        // this.cargar();
        if (this.token.length > 0) {
        return true;
        } else {
        return false;
        }
    }

    // Regresar el token de autenticación.
    getToken(): string {
        return localStorage.getItem('token');
    }

    // Actualizar los datos del usuario en el browser.
    actualizarUsuario(usuario: Usuario) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }

    // Actualizar el perfil de usuario
    actualizarRolUsuario(usuario: Usuario) {
        let us: Usuario = JSON.parse(localStorage.getItem('usuario'));
        us.role = usuario.role;
        this.actualizarUsuario(us);
    }
 }
