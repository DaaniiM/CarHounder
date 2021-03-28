import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/app/modules/chat';
import { Oferta } from 'src/app/modules/oferta';
import { Taller } from 'src/app/modules/taller';
import { CarApiService } from 'src/app/shared/car-api.service';

@Component({
  selector: 'app-pagina-taller',
  templateUrl: './pagina-taller.component.html',
  styleUrls: ['./pagina-taller.component.css']
})
export class PaginaTallerComponent implements OnInit {

  public taller:Taller;
  public servicios: any[];
  public oferta: Oferta;
  public alert1: boolean;
  public rol = this.carApiService.login.rol;
  public chatReaparecer:number;

  constructor(public carApiService:CarApiService,  private _router: Router) {

    this.taller = carApiService.taller;
    this.alert1 = true;

   }

   public detallesServicios() {
    this.carApiService.buscarServicios().subscribe((data:any[]) => {
      this.servicios=data
      console.log(this.servicios)
    });
  }

  public ofertas(id:number){
    this.carApiService.oferta(id).subscribe((data:any[]) => {
      this.oferta=data[0]
      console.log(this.oferta)
    })
  }

  public chatReaparece(id_chat:number){
    this.chatReaparecer = id_chat;
  }

  public reapareceChat(){
    if(this.rol == "cliente"){
      this.carApiService.eliminarChatCliente(0, this.chatReaparecer).subscribe((data:any) => {
        console.log(data);
      });
      this.carApiService.eliminarChatTaller(0, this.chatReaparecer).subscribe((data:any) => {
        console.log(data);
      });
    }
  }

  public postChat(id_taller){
    console.log(this.carApiService.clienteLogin);
    console.log(this.taller);
    this.carApiService.getComprobarChat(this.carApiService.clienteLogin.id_cliente, id_taller).subscribe((data:any) =>{
      console.log(data);
      if(data == ""){
        this.carApiService.postChat(new Chat(this.carApiService.clienteLogin.id_cliente,id_taller)).subscribe((data1:any) =>{
          console.log(data1);
          if(data1!="-1"){
            console.log("Se añadio el chat " + data1);
            this._router.navigate(['/chat']);
          }
          else{
            console.log("Error al crear el chat");
            this.alert1 = false;
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

  ngOnInit(): void {
    this.detallesServicios()
    this.ofertas(this.taller.id_taller)
  }

}
