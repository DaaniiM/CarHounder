import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chat } from '../modules/chat';
import { FavoritosCliente } from '../modules/favoritos-cliente';
import { Cita } from '../modules/cita';
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

  // private url ="https://api-rest-carhounder.herokuapp.com";
  // private url1 = "https://api-rest-carhounder.herokuapp.com/talleres?cp=" ;
  // private url2= "https://api-rest-carhounder.herokuapp.com/servicios" ;
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
  // private url16 = "https://api-rest-carhounder.herokuapp.com/serviciosTalleres";
  // private url17 = "https://api-rest-carhounder.herokuapp.com/borrarServicio?id_servicios=";
  // private url24 = "https://api-rest-carhounder.herokuapp.com/serviciosLogin?id_taller="
  // private url19 = "https://api-rest-carhounder.herokuapp.com/chat";
  // private url20 = "https://api-rest-carhounder.herokuapp.com/mensaje";
  // private url425 = "https://api-rest-carhounder.herokuapp.com/comprobarChat";
  // private url189 = "https://api-rest-carhounder.herokuapp.com/favoritos"
  // private url289 = "https://api-rest-carhounder.herokuapp.com/favoritos?id_cliente="
  // private url426 = "https://api-rest-carhounder.herokuapp.com/eliminarChatCliente";
  // private url427 = "https://api-rest-carhounder.herokuapp.com/eliminarChatTaller";
  // private url280 = "https://api-rest-carhounder.herokuapp.com/resenyas"
  // private url281 = "https://api-rest-carhounder.herokuapp.com/resenyasTaller?id_taller="
  // private url282 = "https://api-rest-carhounder.herokuapp.com/ultimasResenyas"
  // private url283 = "https://api-rest-carhounder.herokuapp.com/filtrarPorServicio"
  // private url284 = "https://api-rest-carhounder.herokuapp.com/filtrarPorPuntuacion?puntuacion="
  // private url18 = "https://api-rest-carhounder.herokuapp.com/citas/cliente";
  // private url25 = "https://api-rest-carhounder.herokuapp.com/citas/cliente?id_cliente=";
  // private url45 = "https://api-rest-carhounder.herokuapp.com/citas/taller?id_taller=";
  // private url38 = "https://api-rest-carhounder.herokuapp.com/citas/cliente?id_cliente=";
  // private url39 = "https://api-rest-carhounder.herokuapp.com/citas/taller?id_taller=";
  // private url59 = "https://api-rest-carhounder.herokuapp.com/citas/clienteNuevo?nombre=";
  // private url89 = "https://api-rest-carhounder.herokuapp.com/citas/taller";
  // private url90 = "https://api-rest-carhounder.herokuapp.com/citas/horas?id_taller=";
  // private url500 = "https://api-rest-carhounder.herokuapp.com/cambiarPassword";
  // private url501 = "https://api-rest-carhounder.herokuapp.com/passwordAnterior?password=";
  // private url503 = "https://api-rest-carhounder.herokuapp.com/passwordAnteriorCliente?password="
  // private url699 = "https://api-rest-carhounder.herokuapp.com/contacto";
  // private url700 = "https://api-rest-carhounder.herokuapp.com/cambiarPasswordCliente";

  private url = "http://localhost:300";
  private url1 = "http://localhost:300/talleres?cp=" ;
  private url2 = "http://localhost:300/servicios" ;
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
  private url16 = "http://localhost:300/serviciosTalleres";
  private url17 = "http://localhost:300/borrarServicio?id_servicios=";
  private url24 = "http://localhost:300/serviciosLogin?id_taller="
  private url19 = "http://localhost:300/chat";
  private url20 = "http://localhost:300/mensaje";
  private url425 = "http://localhost:300/comprobarChat";
  private url189 = "http://localhost:300/favoritos"
  private url289 = "http://localhost:300/favoritos?id_cliente="
  private url426 = "http://localhost:300/eliminarChatCliente";
  private url427 = "http://localhost:300/eliminarChatTaller";
  private url280 = "http://localhost:300/resenyas"
  private url281 = "http://localhost:300/resenyasTaller?id_taller="
  private url282 = "http://localhost:300/ultimasResenyas"
  private url283 = "http://localhost:300/filtrarPorServicio"
  private url284 = "http://localhost:300/filtrarPorPuntuacion?puntuacion="
  private url18 = "http://localhost:300/citas/cliente";
  private url25 = "http://localhost:300/citas/cliente?id_cliente=";
  private url45 = "http://localhost:300/citas/taller?id_taller=";
  private url38 = "http://localhost:300/citas/cliente?id_cliente=";
  private url39 = "http://localhost:300/citas/taller?id_taller=";
  private url59 = "http://localhost:300/citas/clienteNuevo?nombre=";
  private url89 = "http://localhost:300/citas/taller";
  private url90 = "http://localhost:300/citas/horas?id_taller=";
  private url500 = "http://localhost:300/cambiarPassword";
  private url501 = "http://localhost:300/passwordAnterior?password=";
  private url503 = "http://localhost:300/passwordAnteriorCliente?password="
  private url699 = "http://localhost:300/contacto";
  private url700 = "http://localhost:300/cambiarPasswordCliente";
  private url701 ="http://localhost:300/cambiarFotoCliente?foto="
  private url702 ="http://localhost:300/cambiarFotoTaller?foto="

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
  public citaCliente:any;
  public citaTaller:any;
  public nombreP: string;
  public fechaP: string;
  public horaP: string;
  public idReserva: number;
  public horasReservadas:any[]
  public horasFiltradas: any[]

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
    return this.http.post(this.url7, login);
  }

  public loguearse(login:Login){
    return this.http.post(this.url7 + "/usuario", login);
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
    return this.http.put(this.url7, login);
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

  public eliminarChatCliente(del_cliente:number, id_chat:number){
    return this.http.delete(this.url426 + "?del_cliente=" + del_cliente + "&id_chat=" + id_chat);
  }
  
  public eliminarChatTaller(del_taller:number, id_chat:number){
    return this.http.delete(this.url427 + "?del_taller=" + del_taller + "&id_chat=" + id_chat);
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
    return this.http.post(this.url189,favorito);
  }

  public detallesFavoritos(id_cliente:number){
    return this.http.get(this.url289 + id_cliente);
  }

  public eliminarFavorito(id_cliente:number,id_taller:number){
    return this.http.delete(this.url289 + id_cliente + "&id_taller=" + id_taller) ;
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

  public pedirCita(cita:Cita){
    return this.http.post(this.url18, cita);
  }

  public mostrarCitaCliente(id:number){
    return this.http.get(this.url38 + id);
  }

  public mostrarCitaTaller(id:number){
    return this.http.get(this.url39 + id);
  }

  public borrarCitaCliente(id_cliente:number, id_reservas:number){
    return this.http.delete(this.url25 + id_cliente + "&id_reservas=" + id_reservas);
  }

  public borrarCitaTaller(id_taller:number, id_reservas:number){
    return this.http.delete(this.url45 + id_taller + "&id_reservas=" + id_reservas);
  }

  public mostrarClienteNuevo(nombre: string, telefono:number){
    return this.http.get(this.url59 + nombre + "&telefono=" + telefono);
  }

  public modificarCita(cita: Cita){
    return this.http.put(this.url89, cita);
  }

  public mostrarHoras(idTaller: number){
    return this.http.get(this.url90 + idTaller)

  }
  public contacto(json) {
    return this.http.post(this.url699, json);
  }

  public editarPassword(taller: Taller) {
    return this.http.put(this.url500, taller);
  }

  public passwordAnterior(passwordAnterior: string, id_taller: number) {
    return this.http.get(this.url501 + passwordAnterior + "&id_taller=" + id_taller);
  }

  public editarPasswordCliente(cliente: Usuario) {
    return this.http.put(this.url700, cliente);
  }

  public passwordAnteriorCliente(passwordAnterior: string, id_cliente: number) {
    return this.http.get(this.url503 + passwordAnterior + "&id_cliente=" + id_cliente);
  }

  public verificarCorreo(email: string){
    return this.http.get(this.url7 + "?email=" + email);
  }

  public cambiarFotoCliente(foto:string,id_cliente:number) {
    return this.http.get(this.url701 + foto + "&id_cliente=" + id_cliente)
  }

  public cambiarFotoTaller(foto:string,id_taller:number) {
    return this.http.get(this.url702 + foto + "&id_taller=" + id_taller)
  }
}
