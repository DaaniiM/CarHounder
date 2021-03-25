import { Component, OnInit } from '@angular/core';
import { Taller } from 'src/app/modules/taller';
import { CarApiService } from '../../shared/car-api.service';
import { Router } from '@angular/router';
import { Servicio } from 'src/app/modules/servicio';
import { compileNgModule } from '@angular/compiler';
import { Chat } from 'src/app/modules/chat';

@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.css']
})
export class ResultadoBusquedaComponent implements OnInit {

  public servicios: any[];
  public talleres:Taller[];
  public taller: Taller;
  public alert1: boolean;


  constructor(private carApiService:CarApiService, private _router: Router) { 
    this.talleres = carApiService.talleres;
    this.taller = carApiService.taller;
    this.alert1 = true;
  }

  public detallesServicios() {
    this.carApiService.buscarServicios().subscribe((data:any[]) => {
      this.servicios=data
      console.log(this.servicios)
    })
  }

  public detallesTaller(id:number) {
    this.carApiService.detallesTaller(id).subscribe((data:any) => {
      this.carApiService.taller=data[0]
      this._router.navigate(['/paginaTaller']);
    })
  }

  public postChat(id_taller){
    console.log(this.carApiService.clienteLogin);
    console.log(this.taller);
    this.carApiService.getComprobarChat(this.carApiService.clienteLogin.id_cliente, id_taller).subscribe((data:any) =>{
      console.log(data);
      if(data == ""){
        this.carApiService.postChat(new Chat(this.carApiService.clienteLogin.id_cliente,id_taller)).subscribe((data:any) =>{
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
  
  ngOnInit(): void {
    this.detallesServicios()
  }

}
