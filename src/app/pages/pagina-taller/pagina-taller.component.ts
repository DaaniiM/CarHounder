import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/app/modules/chat';
import { Cita } from 'src/app/modules/cita';
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
  public chatReaparecer:number;
  public resenyas:any;
  public cita: Cita;
  public mostrarHoras: any;
  public horas: any[];
  public invisible:boolean;

  constructor(public carApiService:CarApiService,  private _router: Router) {

    this.taller = carApiService.taller;
    this.horas = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
                  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"];
    this.mostrarHoras = [];
    this.invisible = true;

  }

  public detallesServicios() {
    this.carApiService.buscarServicios().subscribe((data:any[]) => {
      this.servicios=data;
    });
  }

  public ofertas(id:number){
    this.carApiService.oferta(id).subscribe((data:any[]) => {
      this.oferta=data[0];
    })
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
          if(data1!="-1" && data!="-2"){
            console.log("chat ok");
            this._router.navigate(['/chat']);
          }
          else{
            console.log("Error chat");
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

  public resenyasTaller(id_taller:number){
    this.carApiService.resenyaTaller(id_taller).subscribe((data:any[]) => {
      this.resenyas=data;
    })
  }

  public noCliente(){
    if(this.carApiService.login.rol === "cliente"){
      this.invisible = false;
    }
    else if(this.carApiService.login.rol === "taller" || this.carApiService.login.rol === undefined){
      this.invisible = true;
    }
  }
  public mostrarHorasReservadas(){
    this.carApiService.mostrarHoras(this.carApiService.taller.id_taller).subscribe((data: any[]) => {
      this.carApiService.horasReservadas = data;
    })
  }

  ngOnInit(): void {
    this.detallesServicios();
    this.ofertas(this.taller.id_taller);
    this.resenyasTaller(this.taller.id_taller);
    this.noCliente();
  }

}
