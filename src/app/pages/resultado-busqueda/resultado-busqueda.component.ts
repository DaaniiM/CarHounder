import { Component, OnInit } from '@angular/core';
import { Taller } from 'src/app/modules/taller';
import { CarApiService } from '../../shared/car-api.service';
import { Router } from '@angular/router';
import { Servicio } from 'src/app/modules/servicio';
import { compileNgModule } from '@angular/compiler';
import { Chat } from 'src/app/modules/chat';
import { FavoritosCliente } from 'src/app/modules/favoritos-cliente';

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
  public favoritosCliente:any[];
  public talleresFav:any[] = [];


  constructor(private carApiService:CarApiService, private _router: Router) { 
    this.talleres = carApiService.talleres;
    this.taller = carApiService.taller;
    this.alert1 = true;
    this.favoritosCliente = carApiService.favoritosCliente;
  }

  public verFavoritos(){

    this.carApiService.detallesFavoritos(this.carApiService.clienteLogin.id_cliente).subscribe((data:any[]) => {
      this.favoritosCliente=data

      for(let i=0;i<this.favoritosCliente.length;i++){

        this.talleresFav.push(data[i].id_taller);

  
      }

      
      console.log(this.talleresFav)
      console.log(data)


      
   
    })

  }

  
  public verFavoritos1(){

    this.carApiService.detallesFavoritos(this.carApiService.clienteLogin.id_cliente).subscribe((data:any[]) => {
      this.favoritosCliente=data

        
      console.log(this.talleresFav)
      console.log(data)
    })

  }


  

  public eliminarFavorito(id_taller:number){


    this.carApiService.eliminarFavorito(this.carApiService.clienteLogin.id_cliente,id_taller).subscribe((data3:any) =>{
      if(data3!="-1"){

      console.log(data3);

      let i = this.talleresFav.indexOf(id_taller);

      this.talleresFav.splice(i,1);

      this.verFavoritos1();
    
      }else
        console.log("Error al intentar eliminar el favorito")
  
    })
  }

  


  public detallesServicios() {
    this.carApiService.buscarServicios().subscribe((data:any[]) => {
      this.servicios=data
      console.log(this.servicios)
    })
  }

  public anyadirFavoritos(id_taller:number) {
  
    
    this.carApiService.anyadirFavorito(new FavoritosCliente(this.carApiService.clienteLogin.id_cliente,id_taller)).subscribe((data:any[]) => {

      this.talleresFav.push(id_taller);
      
     this.verFavoritos1()

      
      console.log(data)
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
    this.verFavoritos()
  }

}
