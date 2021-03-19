import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Taller } from '../modules/taller';
import { Usuario } from '../modules/usuario';

@Injectable({
  providedIn: 'root'
})
export class CarApiService {

  private url="http://localhost:300";


  constructor(private http:HttpClient) { }



  public registrarCliente(cliente:Usuario) {

    return this.http.post(this.url + "/registrar/usuario" ,cliente)

  }

  
  public registrarTaller(taller:Taller) {

    return this.http.post(this.url + "/registrar/taller",taller)

  }

}