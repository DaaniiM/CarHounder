import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from '../modules/chat';
import { FavoritosCliente } from '../modules/favoritos-cliente';
import { Login } from '../modules/login';
import { Oferta } from '../modules/oferta';
import { Mensaje } from '../modules/mensaje';
import { Servicio } from '../modules/servicio';
import { Taller } from '../modules/taller';
import { TalleresServicios } from '../modules/talleres-servicios';
import { Usuario } from '../modules/usuario';
import { ResClientes } from '../modules/res-clientes';
import { FiltarServicios } from '../modules/filtar-servicios';

@Injectable({
  providedIn: 'root'
})
export class CarApiService {

  // private url = "https://api-rest-carhounder.herokuapp.com";
  // private url1 = "https://api-rest-carhounder.herokuapp.com/talleres?cp=" ;
  // private url2 = "https://api-rest-carhounder.herokuapp.com/servicios?id=" ;
  // private url3 = "https://api-rest-carhounder.herokuapp.com/talleresDetalles?id=" ;  
  // private url4 = "https://api-rest-carhounder.herokuapp.com/oferta?id=" ;
  // private url7 = "https://api-rest-carhounder.herokuapp.com/login";
  // private url8 = "https://api-rest-carhounder.herokuapp.com/talleresLogin?email=";
  // private url9 = "https://api-rest-carhounder.herokuapp.com/clientesLogin?email=";
  // private url10 = "https://api-rest-carhounder.herokuapp.com/borrarTaller?id=";
  // private url11 = "https://api-rest-carhounder.herokuapp.com/borrarCliente?id=";
  // private url12 = "https://api-rest-carhounder.herokuapp.com/borrarLogin?email=";
  // private url13 = "https://api-rest-carhounder.herokuapp.com/cliente";
  // private url14 = "https://api-rest-carhounder.herokuapp.com/taller";
  // private url15 = "https://api-rest-carhounder.herokuapp.com/login";
  // private url16 = "https://api-rest-carhounder.herokuapp.com/serviciosTalleres";
  // private url17 = "https://api-rest-carhounder.herokuapp.com/borrarServicio?id_servicios=";
  // private url24 = "https://api-rest-carhounder.herokuapp.com/serviciosLogin?id_taller="
  // private url19 = "https://api-rest-carhounder.herokuapp.com/chat";
  // private url20 = "https://api-rest-carhounder.herokuapp.com/mensaje";
  // private url425 = "https://api-rest-carhounder.herokuapp.com/comprobarChat";

  private url="http://localhost:300";
  private url1 = "http://localhost:300/talleres?cp=" ;
  private url2= "http://localhost:300/servicios" ;
  private url3 = "http://localhost:300/talleresDetalles?id=" ;
  private url4 = "http://localhost:300/oferta?id=" ;
  private url7 = "http://localhost:300/login";
  private url8 = "http://localhost:300/talleresLogin?email=";
  private url9 = "http://localhost:300/clientesLogin?email=";
  private url10 = "http://localhost:300/borrarTaller?id=";
  private url11 = "http://localhost:300/borrarCliente?id=";
  private url12 = "http://localhost:300/borrarLogin?email=";
  private url13 = "http://localhost:300/cliente";
  private url14 = "http://localhost:300/taller";
  private url15 = "http://localhost:300/login";
  private url16 = "http://localhost:300/serviciosTalleres";
  private url17 = "http://localhost:300/borrarServicio?id_servicios=";
  private url24 = "http://localhost:300/serviciosLogin?id_taller="
  private url19 = "http://localhost:300/chat";
  private url20= "http://localhost:300/mensaje";
  private url425 = "http://localhost:300/comprobarChat";


  private url189="http://localhost:300/favoritos"
  private url289="http://localhost:300/favoritos?id_cliente="
  private url280="http://localhost:300/resenyas"
  private url281="http://localhost:300/resenyasTaller?id_taller="
  private url282="http://localhost:300/ultimasResenyas"
  private url283="http://localhost:300/filtrarPorServicio"
  private url284="http://localhost:300/filtrarPorPuntuacion?puntuacion="
  


  public talleres:Taller[];
  public servicios:any[];
  public taller: any;
  public login: any;
  public tallerLogin: Taller;
  public clienteLogin:any;
  public tipoUsuario:String;
  public ofertaTaller:any;
  public chat: Chat;
  public favoritosCliente:any[];
  public cpTalleresFiltros:number = 0;
  
  constructor(private http:HttpClient) { }
  
  public buscarTalleres(cp:number) {
    console.log(this.talleres)
    console.log(cp)
    if(cp != 0 ) {
      return this.http.get(this.url1 + cp);
    } else {
      return this.http.get(this.url + "/talleres");
    }
  }

  public registrarCliente(cliente:Usuario) {
    return this.http.post(this.url + "/registrar/usuario" ,cliente);
  }
  
  public registrarTaller(taller:Taller) {
    return this.http.post(this.url + "/registrar/taller",taller);
  }

  public buscarServicios() {
    return this.http.get(this.url2);
  }

  public detallesTaller(id:number){
    return this.http.get(this.url3 + id);
  }

  public oferta(id:number){
    return this.http.get(this.url4 + id);
  }

  public registrarLogin(login:Login){
    return this.http.post(this.url7,login);
  }

  public loguearse(login:Login){
    return this.http.post(this.url7 + "/usuario",login);
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
    return this.http.delete(this.url12 + email);
  }

  public editarTaller(taller:Taller){
    return this.http.put(this.url14, taller);
  }
  
  public editarCliente(cliente:Usuario){
    return this.http.put(this.url13, cliente);
  }

  public editarLogin(login:Login){
    return this.http.put(this.url15, login);
  }

  public postChat(chat:Chat){
    return this.http.post(this.url19, chat);
  }

  public postMensaje(mensaje:Mensaje){
    return this.http.post(this.url20, mensaje);
  }

  public getChat(email:string, rol:string){
    return this.http.get(this.url19 + "?email=" + email + "&rol=" + rol);
  }

  public getMensaje(id_chat:number){
    return this.http.get(this.url20 + "?id_chat=" + id_chat);
  }

  public deleteChat(id_chat:number){
    return this.http.delete(this.url19 + "?id_chat=" + id_chat);
  }

  public deleteMensaje(id_chat:number){
    return this.http.delete(this.url20 + "?id_chat=" + id_chat);
  }

  public getComprobarChat(id_cliente:number, id_taller:number){
    return this.http.get(this.url425 + "?id_cliente=" + id_cliente + "&id_taller=" + id_taller);
  }

  public crearOferta(oferta:Oferta){
    return this.http.post(this.url4,oferta);
  }

  public editarOferta(oferta:Oferta){
    return this.http.put(this.url4, oferta);
  }

  public insertarServicio(tallerServicios:TalleresServicios){
    return this.http.post(this.url16,tallerServicios);
  }

  public eliminarServicio(id_servicios:number,id_taller:number){
    return this.http.delete(this.url17 + id_servicios + "&id_taller=" + id_taller);
  }

  public detallesOfertaTaller(id_taller:number){
    return this.http.get(this.url24 + id_taller);
  }

  public anyadirFavorito(favorito:FavoritosCliente){

    return this.http.post(this.url189,favorito)
  }

  public detallesFavoritos(id_cliente:number){

    return this.http.get(this.url289 + id_cliente);

  }

  public eliminarFavorito(id_cliente:number,id_taller:number){

    return this.http.delete(this.url289 + id_cliente + "&id_taller=" + id_taller) 
  }
  
  
  public postResenya(ResClientes:ResClientes){
    return this.http.post(this.url280, ResClientes);
  }

  public resenyaTaller(id_taller:number){

    return this.http.get(this.url281 + id_taller);

  }

  public ultimasResenyas(){

    return this.http.get(this.url282);

  }
  
  public filtrarPorServicio(FiltarServicios:FiltarServicios){

    return this.http.post(this.url283,FiltarServicios)
  }

  public filtrarPorPuntuacion(puntuacion:number){

    return this.http.get(this.url284 + puntuacion);

  }

  public filtrarPorPuntuacionCp(puntuacion:number,cp:number){

    return this.http.get(this.url284 + puntuacion + "&cp=" + cp);

  }

}
