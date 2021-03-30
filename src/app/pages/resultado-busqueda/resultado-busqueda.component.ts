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

@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.css']
})
export class ResultadoBusquedaComponent implements OnInit {

  public servicios: any[];
  public talleres:any[];
  public taller: any;
  public alert1: boolean;
  public favoritosCliente:any[];
  public talleresFav:any[] = [];
  public login:any;
  public tallerRes:any;
  public serviciosFiltro:any[] = [];
  public puntuacion:number;




  constructor(private carApiService:CarApiService, private _router: Router) { 
    this.talleres = carApiService.talleres;
    this.taller = carApiService.taller;
    this.alert1 = true;
    this.favoritosCliente = carApiService.favoritosCliente;
    this.login = carApiService.login;
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

  public publicarRes(id_taller:number){
    this.tallerRes = id_taller;
  }


  public anyadirResenya(comentario:string,nota:number) {
  
    
    this.carApiService.postResenya(new ResClientes(0,this.tallerRes,this.carApiService.clienteLogin.id_cliente,comentario,nota)).subscribe((data:any[]) => {
      
     
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

          if(data!="-1"){

            this.talleres=data
          
            console.log(data)
            this.ngOnInit()
    
          }
          else

          this.talleres = []
        
        });

     

      }else{

        this.carApiService.filtrarPorServicio(new FiltarServicios(this.serviciosFiltro)).subscribe((data:any) => {

          if(data!="-1"){

            this.talleres=data
          
            console.log(data)
            this.ngOnInit()
    
          }
          else

          this.talleres = []
        
        });

      }


    }else{

      this.talleres=this.carApiService.talleres;
      this.ngOnInit()
      
    }

  }

  public anyadirPuntuacionFiltro(puntuacion1:string,idHtml:string){

    var checkBox = document.getElementById(idHtml) as HTMLInputElement;

    
    if (checkBox.checked == true){

      this.puntuacion = Number(puntuacion1);
      console.log(this.puntuacion)

    } else {


      this.puntuacion = 0;



    }
  }

  public filtrarPorPuntuacion(){

  
  if(this.carApiService.cpTalleresFiltros == 0){

    if(this.puntuacion != 0 ){
    
    this.carApiService.filtrarPorPuntuacion(this.puntuacion).subscribe((data:any[]) => {
      this.talleres = data
      this.ngOnInit()
  
    })

    }else{  

      this.talleres = this.carApiService.talleres;

      this.ngOnInit()

    }

  }else{

    if(this.puntuacion != 0 ){
    
      this.carApiService.filtrarPorPuntuacionCp(this.puntuacion,this.carApiService.cpTalleresFiltros).subscribe((data:any[]) => {
        this.talleres = data
        this.ngOnInit()
    
      })
  
      }else{  
  
        this.talleres = this.carApiService.talleres;
  
        this.ngOnInit()
      }
  }

}

public conseguirTalleres(cp:string) {
    
  this.carApiService.buscarTalleres(Number(cp)).subscribe((data:Taller[]) => {
    this.talleres=data
    this.carApiService.talleres = this.talleres;
    this.carApiService.cpTalleresFiltros = Number(cp);
    this.ngOnInit()
  })

  

}


  
  ngOnInit(): void {
    this.detallesServicios()
    this.verFavoritos()

  }

}
