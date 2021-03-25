import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/modules/mensaje';
import { CarApiService } from 'src/app/shared/car-api.service';
import { Router } from '@angular/router';

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
  public alert1: boolean;
  public alert2: boolean;

  constructor(public apiService:CarApiService, private _router: Router) {

    this.alert1 = true;
    this.alert2 = true;

   }


  public getChat(){
    this.apiService.getChat(this.apiService.login.email, this.rol).subscribe((data:any) =>{
      console.log(data);
      this.chats = data;
    });
  }

  public getMensaje(id_chat:number){
    if(id_chat != undefined){
      this.apiService.getMensaje(Number(id_chat)).subscribe((data:any[]) =>{
        console.log(data);
        this.alert1 = true;
        this.alert2 = true;
        this.mensajes = data;
        this.id_chat = id_chat;
        console.log(this.mensajes);
        let objDiv = document.getElementById("mensajes");
        objDiv.scrollTop = objDiv.scrollHeight;
      });
    }
  }

  public postMensaje( mensaje:string){
    if(this.id_chat != null){
      if(mensaje != ""){
        this.apiService.postMensaje(new Mensaje( this.id_chat, this.rol, mensaje)).subscribe((data:any) =>{
          console.log(data);
          let msj = document.getElementById("mensaje") as HTMLInputElement;
          msj.value = "";
          let objDiv = document.getElementById("mensajes");
          objDiv.scrollTop = objDiv.scrollHeight;
          this.getMensaje(this.id_chat);
          this._router.navigate(['/chat']);
        });
      }
      else{
        this.alert2 = false;
      }
    }
    else{
      this.alert1 = false;
    }
  }

  public deleteChat(id_chat:number){
    this.apiService.deleteChat(id_chat).subscribe((data:any) =>{
      console.log(data);
      console.log(id_chat);
      this.getChat();
      this.getMensaje(id_chat);
    });
  }

  ngOnInit(): void {
   this.getChat();
  }

}
