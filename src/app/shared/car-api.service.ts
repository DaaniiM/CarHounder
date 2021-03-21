import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servicio } from '../modules/servicio';
import { Taller } from '../modules/taller';
import { Usuario } from '../modules/usuario';

@Injectable({
  providedIn: 'root'
})
export class CarApiService {

  private url="https://api-rest-carhounder.herokuapp.com";
  private url1 = "https://api-rest-carhounder.herokuapp.com/talleres?cp=" ;
  private url2= "https://api-rest-carhounder.herokuapp.com/servicios?id=" ;

  // private url="http://localhost:300";
  // private url1 = "http://localhost:300/talleres?cp=" ;
  // private url2= "http://localhost:300/servicios" ;
  
  public talleres:Taller[];
  public servicios:any[];
  


  constructor(private http:HttpClient) { }
  



  public registrarCliente(cliente:Usuario) {

    return this.http.post(this.url + "/registrar/usuario" ,cliente)

  }

  
  public registrarTaller(taller:Taller) {

    return this.http.post(this.url + "/registrar/taller",taller)

    

  }

  public buscarTalleres(cp:number) {
    console.log(this.talleres)
    console.log(cp)

    if(cp != 0 ) {
      return this.http.get(this.url1 + cp);
    } else {
      return this.http.get(this.url + "/talleres");
    }
    
  }

  public buscarServicios() {

    return this.http.get(this.url2);

  }

}
