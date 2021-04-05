import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/modules/mensaje';
import { CarApiService } from 'src/app/shared/car-api.service';
import { Router } from '@angular/router';
import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.min.css'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public chats = [];
  public mensajes: any[];
  public rol = this.apiService.login.rol;
  public id_chat: number;
  public chatEliminar:number;

  constructor(public apiService:CarApiService, private _router: Router) {

   }

  public getChat(){
    this.apiService.getChat(this.apiService.login.email, this.rol).subscribe((data:any) =>{
      this.chats = data;
    });
  }

  public getMensaje(id_chat:number){
    if(id_chat != undefined){
      this.apiService.getMensaje(Number(id_chat)).subscribe((data:any[]) =>{
        this.mensajes = data;
        this.id_chat = id_chat;
        let objDiv = document.getElementById("mensajes");
        objDiv.scrollTop = objDiv.scrollHeight;
      });
    }
  }

  public postMensaje( mensaje:string){
    if(this.id_chat != null){
      if(mensaje != ""){
        this.apiService.postMensaje(new Mensaje( this.id_chat, this.rol, mensaje)).subscribe((data:any) =>{
          if(data != "-1" && data != "-2"){
            let msj = document.getElementById("mensaje") as HTMLInputElement;
            msj.value = "";
            let objDiv = document.getElementById("mensajes");
            objDiv.scrollTop = objDiv.scrollHeight;
            this.getMensaje(this.id_chat);
            this._router.navigate(['/chat']);
          }
        });
      }
      else{
        this.pushNotify2();
      }
    }
    else{
      this.pushNotify();
    }
  }

  public deleteChatResponsive(id_chat:number){
    if(this.rol == "cliente"){
      this.apiService.eliminarChatCliente(1, id_chat).subscribe((data:any) => {
        this.mensajes = null
        this.pushNotify3();
        this.ngOnInit();
      });
    }
    else if(this.rol == "taller"){
      this.apiService.eliminarChatTaller(1, id_chat).subscribe((data:any) => {
        this.pushNotify3();
        this.ngOnInit();
      });
    }
  }

  public deleteChat(){
    if(this.rol == "cliente"){
      this.apiService.eliminarChatCliente(1, this.chatEliminar).subscribe((data:any) => {
        this.mensajes = null
        this.pushNotify3();
        this.ngOnInit();
      });
    }
    else if(this.rol == "taller"){
      this.apiService.eliminarChatTaller(1, this.chatEliminar).subscribe((data:any) => {
        this.mensajes = null
        this.pushNotify3();
        this.ngOnInit();
      });
    }
  }

  public chatElimina(id_chat:number){
    this.chatEliminar = id_chat;
  }

  

  public pushNotify() {
    new Notify({
      status: 'error',
      title: '',
      text: 'Debe seleccionar una conversación',
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
      text: 'Debe escribir un mensaje',
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
      status: 'success',
      title: '',
      text: 'Chat eliminado',
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
   this.getChat();
  }

}
