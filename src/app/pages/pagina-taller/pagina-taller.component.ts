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
  public resenyas:any;

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

  public postChat(){
    console.log(this.carApiService.clienteLogin);
    console.log(this.taller);
    this.carApiService.getComprobarChat(this.carApiService.clienteLogin.id_cliente, this.taller.id_taller).subscribe((data:any) =>{
      console.log(data);
      if(data == ""){
        this.carApiService.postChat(new Chat(this.carApiService.clienteLogin.id_cliente,this.taller.id_taller)).subscribe((data:any) =>{
          console.log(data);
          if(data!="-1"){
            console.log("Se añadio el chat " + data);
            this._router.navigate(['/chat']);
          }
          else
            console.log("Error al crear el chat");
            this.alert1 = false
        });
      }
      else{
        this._router.navigate(['/chat']);
      }
    });
  }

  public resenyasTaller(id_taller:number){
    this.carApiService.resenyaTaller(id_taller).subscribe((data:any[]) => {
      this.resenyas=data
      console.log(this.resenyas)
    })
  }






  ngOnInit(): void {
    this.detallesServicios()
    this.ofertas(this.taller.id_taller)
    this.resenyasTaller(this.taller.id_taller)
  }

}
