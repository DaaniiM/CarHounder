import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servicio } from '../modules/servicio';
import { Taller } from '../modules/taller';
import { Usuario } from '../modules/usuario';

@Injectable({
  providedIn: 'root'
})
export class CarApiService {

  // private url="https://api-rest-carhounder.herokuapp.com";
  // private url1 = "https://api-rest-carhounder.herokuapp.com/talleres?cp=" ;
  // private url2= "https://api-rest-carhounder.herokuapp.com/servicios?id=" ;
  // private url3 = "https://api-rest-carhounder.herokuapp.com/talleresDetalles?id=" ;  
  // private url4 = "https:///api-rest-carhounder.herokuapp.com/oferta?id=" ;


  private url="http://localhost:300";
  private url1 = "http://localhost:300/talleres?cp=" ;
  private url2= "http://localhost:300/servicios" ;
  private url3 = "http://localhost:300/talleresDetalles?id=" ;
  private url4 = "http://localhost:300/oferta?id=" ;
  private url5 = "http://localhost:300/loginCliente";
  private url6 = "http://localhost:300/loginTaller";
  
  public talleres:Taller[];
  public servicios:any[];
  public taller: Taller;
  


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

  public detallesTaller(id:number){

    return this.http.get(this.url3 + id);

  }

  public oferta(id:number){

    return this.http.get(this.url4 + id)
  }

  public login(){

    return this.http.get(this.url5) && this.http.get(this.url6)


  }

}
