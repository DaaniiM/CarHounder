import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/modules/login';
import { Usuario } from 'src/app/modules/usuario';
import { CarApiService } from 'src/app/shared/car-api.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  public favoritos:any[];

  constructor(public apiService:CarApiService,private _router: Router) {

    

   }

  public verFavoritos(){

    this.apiService.detallesFavoritos(this.apiService.clienteLogin.id_cliente).subscribe((data:any[]) => {
      this.favoritos=data
      this.apiService.favoritosCliente = this.favoritos;
      
      console.log(this.apiService.favoritosCliente)
    })

  }

  public eliminarFavorito(id_taller:number){


    this.apiService.eliminarFavorito(this.apiService.clienteLogin.id_cliente,id_taller).subscribe((data3:any) =>{
      if(data3!="-1"){

        console.log(data3);
        this.verFavoritos();

      }else
        console.log("Error al intentar eliminar el favorito")
  
    })
  }
    


  public eliminarCliente(){


    this.apiService.eliminarCliente(this.apiService.clienteLogin.id_cliente).subscribe((data3:any) =>{
      if(data3!="-1"){

        this.apiService.clienteLogin = undefined;
        this.apiService.eliminarLogin(this.apiService.login.email).subscribe((data3:any) =>{
          if(data3!="-1"){
                
            this.apiService.login = undefined;
            this._router.navigate(['']);
    
    
            }else{
            console.log("Error al intentar eliminar el usuario")
          }
        })
        
        
      }else{
        console.log("Error al intentar eliminar el cliente")
      }
    })
    


   }

   public editarCliente(email:string, password: string, nombre:string,apellidos:string, telefono:any, foto:string){

  
    this.apiService.editarCliente(new Usuario(this.apiService.clienteLogin.id_cliente, email, password, nombre, apellidos,Number(telefono), foto)).subscribe((data:any) =>{
      console.log(this.apiService.clienteLogin)
      if(data!="-1"){

        this.apiService.clienteLogin = new Usuario(this.apiService.clienteLogin.id_cliente, email, password, nombre, apellidos,Number(telefono), foto);

        this.apiService.editarLogin(new Login(email, password)).subscribe((data1) =>{
          if(data1){
            console.log(data1);
          }
          else{
            console.log("Error al intentar modificar el taller");
          }
        })

        console.log(data)
        
      }else{
        console.log("Error al intentar modificar el taller");
      }
    })

   }



  ngOnInit(): void {

    this.verFavoritos();

  }

}
