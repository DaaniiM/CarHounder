import { Component, NgModule, OnInit } from '@angular/core';
import { Taller } from 'src/app/modules/taller';
import { CarApiService } from '../../shared/car-api.service';
import { Router } from '@angular/router';
import { Servicio } from 'src/app/modules/servicio';
import { compileNgModule, ThrowStmt } from '@angular/compiler';
import { Chat } from 'src/app/modules/chat';
import { FavoritosCliente } from 'src/app/modules/favoritos-cliente';
import { ResClientes } from 'src/app/modules/res-clientes';
import { FiltarServicios } from 'src/app/modules/filtar-servicios';
import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.min.css'

@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.css']
})
export class ResultadoBusquedaComponent implements OnInit {

  public servicios: any[];
  public talleres:any[];
  public taller: any;
  public favoritosCliente:any[];
  public talleresFav:any[] = [];
  public chatReaparecer:number;
  public invisible:boolean;
  public login:any;
  public tallerRes:any;
  public serviciosFiltro:any[] = [];
  public puntuacion:number;

  constructor(private carApiService:CarApiService, private _router: Router) { 
    this.talleres = carApiService.talleres;
    this.taller = carApiService.taller;
    this.favoritosCliente = carApiService.favoritosCliente;
    this.login = carApiService.login;
    this.invisible = true;
  }

  public verFavoritos(){
    this.carApiService.detallesFavoritos(this.carApiService.clienteLogin.id_cliente).subscribe((data:any[]) => {
      this.favoritosCliente=data
      for(let i=0;i<this.favoritosCliente.length;i++){
        this.talleresFav.push(data[i].id_taller);
      }
    });
  }

  public verFavoritos1(){
    this.carApiService.detallesFavoritos(this.carApiService.clienteLogin.id_cliente).subscribe((data:any[]) => {
      this.favoritosCliente=data;
    });
  }

  public eliminarFavorito(id_taller:number){
    this.carApiService.eliminarFavorito(this.carApiService.clienteLogin.id_cliente,id_taller).subscribe((data3:any) =>{
      if(data3!="-1" && data3!="-2"){
        let i = this.talleresFav.indexOf(id_taller);
        this.talleresFav.splice(i,1);
        this.verFavoritos1();
      }else
        this.pushNotify2();
    });
  }

  public detallesServicios() {
    this.carApiService.buscarServicios().subscribe((data:any[]) => {
      this.servicios=data;
    });
  }

  public anyadirFavoritos(id_taller:number) {
    this.carApiService.anyadirFavorito(new FavoritosCliente(this.carApiService.clienteLogin.id_cliente,id_taller)).subscribe((data:any[]) => {
      this.talleresFav.push(id_taller);
      this.verFavoritos1();
    });
  }

  public publicarRes(id_taller:number){
    this.tallerRes = id_taller;
  }
  public anyadirResenya(comentario:string,nota:number) { 
    this.carApiService.postResenya(new ResClientes(0,this.tallerRes,this.carApiService.clienteLogin.id_cliente,comentario,nota)).subscribe((data:any) => {
      if(data!="-1" && data!="-2"){
        this.pushNotify4();
      }
      else{
        this.pushNotify5();
      }

    });
  }

  public detallesTaller(id:number) {
    this.carApiService.detallesTaller(id).subscribe((data:any) => {
      this.carApiService.taller=data[0];
      this._router.navigate(['/paginaTaller']);
    });
  }

  public chatReaparece(id_chat:number){
    this.chatReaparecer = id_chat;
  }

  public reapareceChat(){
    if(this.carApiService.login.rol == "cliente"){
      this.carApiService.eliminarChatCliente(0, this.chatReaparecer).subscribe((data:any) => {
      });
      this.carApiService.eliminarChatTaller(0, this.chatReaparecer).subscribe((data:any) => {
      });
    }
  }

  public postChat(id_taller){
    this.carApiService.getComprobarChat(this.carApiService.clienteLogin.id_cliente, id_taller).subscribe((data:any) =>{
      if(data == ""){
        this.carApiService.postChat(new Chat(this.carApiService.clienteLogin.id_cliente,id_taller)).subscribe((data1:any) =>{
          if(data1!="-1" && data1!="-2"){
            this._router.navigate(['/chat']);
          }
          else{
            this.pushNotify3();
          }
        });
      }
      else{
        this.chatReaparece(data[0].id_chat);
        this.reapareceChat();
        this._router.navigate(['/chat']);
      }
    });
  }

  public noCliente(){
    if(this.carApiService.login.rol === "cliente"){
      this.invisible = false;
    }
    else if(this.carApiService.login.rol === "taller" || this.carApiService.login.rol === undefined){
      this.invisible = true;
    }
  }
  
  public anyadirServicioFiltro(id_servicio:string,idHtml:string){
    var checkBox = document.getElementById(idHtml) as HTMLInputElement;   
    if (checkBox.checked == true){
      this.serviciosFiltro.push(Number(id_servicio));
    } else {
      let i = this.serviciosFiltro.indexOf(Number(id_servicio));
      this.serviciosFiltro.splice(i,1);
    }
  }

  public filtrarPorServicio() { 
    if(this.serviciosFiltro.length != 0){
      if(this.carApiService.cpTalleresFiltros != 0){
        this.carApiService.filtrarPorServicio(new FiltarServicios(this.serviciosFiltro,this.carApiService.cpTalleresFiltros)).subscribe((data:any) => {
          if(data!="-1" && data!="-2"){
            this.talleres=data;
            this.ngOnInit();
          }
          else
          this.talleres = [];
        });
      }else{
        this.carApiService.filtrarPorServicio(new FiltarServicios(this.serviciosFiltro)).subscribe((data:any) => {
          if(data!="-1" && data!="-2"){
            this.talleres=data;
            this.ngOnInit();
          }
          else
          this.talleres = [];
        });
      }
    }else{
      this.talleres=this.carApiService.talleres;
      this.ngOnInit();
    }
  }

  public anyadirPuntuacionFiltro(puntuacion1:string,idHtml:string){
    var checkBox = document.getElementById(idHtml) as HTMLInputElement;
    if (checkBox.checked == true){
      this.puntuacion = Number(puntuacion1);
    } else {
      this.puntuacion = 0;
    }
  }

  public filtrarPorPuntuacion(){ 
  if(this.carApiService.cpTalleresFiltros == 0){
    if(this.puntuacion != 0 ){
    this.carApiService.filtrarPorPuntuacion(this.puntuacion).subscribe((data:any[]) => {
      this.talleres = data
      this.ngOnInit();
    })
    }else{  
      this.talleres = this.carApiService.talleres;
      this.ngOnInit();
    }
  }else{
    if(this.puntuacion != 0 ){
      this.carApiService.filtrarPorPuntuacionCp(this.puntuacion,this.carApiService.cpTalleresFiltros).subscribe((data:any[]) => {
        this.talleres = data
        this.ngOnInit();
      });
      }else{  
        this.talleres = this.carApiService.talleres;
        this.ngOnInit();
      }
    }
  }

  public conseguirTalleres(cp:string) {  
    this.carApiService.buscarTalleres(Number(cp)).subscribe((data:Taller[]) => {
      this.talleres=data;
      this.carApiService.talleres = this.talleres;
      this.carApiService.cpTalleresFiltros = Number(cp);
      this.ngOnInit();
    })
  }

  public pushNotify() {
    new Notify({
      status: 'success',
      title: '',
      text: 'Taller añadido a favoritos',
      effect: 'fade',
      speed: 300,
      customClass: null,
      customIcon: null,
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 3000,
      gap: 60,
      distance: 20,
      type: 1,
      position: 'right top'
    });
  }
  
  public pushNotify1() {
    new Notify({
      status: 'warning',
      title: '',
      text: 'Taller eliminado de favoritos',
      effect: 'fade',
      speed: 300,
      customClass: null,
      customIcon: null,
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 3000,
      gap: 60,
      distance: 20,
      type: 1,
      position: 'right top'
    });
  }

  public pushNotify2() {
    new Notify({
      status: 'error',
      title: '',
      text: 'Error al eliminado de favoritos',
      effect: 'fade',
      speed: 300,
      customClass: null,
      customIcon: null,
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 3000,
      gap: 60,
      distance: 20,
      type: 1,
      position: 'right top'
    });
  }

  public pushNotify3() {
    new Notify({
      status: 'error',
      title: '',
      text: 'Error al abrir el chat',
      effect: 'fade',
      speed: 300,
      customClass: null,
      customIcon: null,
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 3000,
      gap: 60,
      distance: 20,
      type: 1,
      position: 'right top'
    });
  }

  public pushNotify4() {
    new Notify({
      status: 'success',
      title: '',
      text: 'Reseña enviada',
      effect: 'fade',
      speed: 300,
      customClass: null,
      customIcon: null,
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 3000,
      gap: 60,
      distance: 20,
      type: 1,
      position: 'right top'
    });
  }

  public pushNotify5() {
    new Notify({
      status: 'error',
      title: '',
      text: 'Error al enviar la reseña',
      effect: 'fade',
      speed: 300,
      customClass: null,
      customIcon: null,
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 3000,
      gap: 60,
      distance: 20,
      type: 1,
      position: 'right top'
    });
  }

  ngOnInit(): void {
    this.detallesServicios();
    this.verFavoritos();
    this.noCliente();
  }
}
