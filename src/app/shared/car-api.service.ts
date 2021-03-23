import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../modules/login';
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
  // private url4 = "https://api-rest-carhounder.herokuapp.com/oferta?id=" ;
  // private url7 = "https://api-rest-carhounder.herokuapp.com/login";
  // private url8 = "https://api-rest-carhounder.herokuapp.com/talleresLogin?email=";
  // private url9 = "https://api-rest-carhounder.herokuapp.com/clientesLogin?email=";
  // private url10 = "https://api-rest-carhounder.herokuapp.com/borrarTaller?id=";
  // private url11 = "https://api-rest-carhounder.herokuapp.com/borrarCliente?id=";
  // private url12 = "https://api-rest-carhounder.herokuapp.com/borrarLogin?email=";


  private url="http://localhost:300";
  private url1 = "http://localhost:300/talleres?cp=" ;
  private url2= "http://localhost:300/servicios" ;
  private url3 = "http://localhost:300/talleresDetalles?id=" ;
  private url4 = "http://localhost:300/oferta?id=" ;
  // private url5 = "http://localhost:300/loginCliente"; ---- 
  // private url6 = "http://localhost:300/loginTaller"; ---
  private url7 = "http://localhost:300/login";
  private url8 = "http://localhost:300/talleresLogin?email=";
  private url9 = "http://localhost:300/clientesLogin?email=";
  private url10 = "http://localhost:300/borrarTaller?id=";
  private url11 = "http://localhost:300/borrarCliente?id=";
  private url12 = "http://localhost:300/borrarLogin?email=";
  private url13 = "http://localhost:300/cliente";
  private url14 = "http://localhost:300/taller";
  private url15 = "http://localhost:300/login";


  public talleres:Taller[];
  public servicios:any[];
  public taller: Taller;
  public login: any;
  public tallerLogin: Taller;
  public clienteLogin:any;
  public tipoUsuario:String;
  


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


  public registrarLogin(login:Login){

    return this.http.post(this.url7,login)
  }

  public loguearse(login:Login){

    return this.http.post(this.url7 + "/usuario",login)


  }

  public loginTaller(email:string){

    return this.http.get(this.url8 + email);

  }

  public loginCliente(email:string){

    return this.http.get(this.url9 + email);

  }

  public eliminarTaller(id:number){

    return this.http.delete(this.url10 + id);
  }

  
  public eliminarCliente(id:number){

    return this.http.delete(this.url11 + id);
  }

  public eliminarLogin(email:string){

    return this.http.delete(this.url12 + email)

  }

  public editarTaller(taller:Taller){

    return this.http.put(this.url14, taller)

  }
  
  public editarCliente(cliente:Usuario){

    return this.http.put(this.url13, cliente)

  }

  public editarLogin(login:Login){

    return this.http.put(this.url15, login)

  }

}
