import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Taller } from '../modules/taller';
import { Usuario } from '../modules/usuario';

@Injectable({
  providedIn: 'root'
})
export class CarApiService {

  private urlRegistroUsuario="http://localhost:300/registrar/usuario";
  private urlRegistroTaller="http://localhost:300/registrar/taller";


  constructor(private http:HttpClient) { }



  public registrarCliente(cliente:Usuario) {

    return this.http.post(this.urlRegistroUsuario,cliente)

  }

  
  public registrarTaller(taller:Taller) {

    return this.http.post(this.urlRegistroTaller,taller)

  }

}
