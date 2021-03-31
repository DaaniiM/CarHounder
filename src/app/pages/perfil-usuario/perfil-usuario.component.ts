import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/modules/login';
import { Usuario } from 'src/app/modules/usuario';
import { CarApiService } from 'src/app/shared/car-api.service';
import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.min.css'

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

   public editarCliente(email:string, nombre:string,apellidos:string, telefono:any, foto:string){

  
    this.apiService.editarCliente(new Usuario(this.apiService.clienteLogin.id_cliente, email,"", nombre, apellidos,Number(telefono),foto)).subscribe((data:any) =>{
      console.log(this.apiService.clienteLogin)
      if(data!="-1" && data!="-2"){

        this.apiService.clienteLogin = new Usuario(this.apiService.clienteLogin.id_cliente, email, "", nombre, apellidos,Number(telefono),foto);
        
        this.pushNotify9();

      }else{
        this.pushNotify10();
      }
    })

   }

   public password_Anterior(passwordAnterior:string, passwordNuevo:string, passwordRepetido:string) {
    this.apiService.passwordAnteriorCliente(passwordAnterior,this.apiService.clienteLogin.id_cliente).subscribe((data) => {
      if (data != "-1" && data != "-2") {
        this.editarPassword(passwordNuevo, passwordRepetido);

      } else {
        this.pushNotify6();
      }
    })
  }

  public editarPassword(passwordNuevo:string, passwordRepetido:string) {
   if(passwordNuevo == passwordRepetido) {
     this.apiService.editarPasswordCliente(new Usuario(this.apiService.clienteLogin.id_cliente, "", passwordNuevo, "", "", 0, "")).subscribe((data:any) =>  {
       this.apiService.editarLogin(new Login(this.apiService.clienteLogin.email, passwordNuevo)).subscribe((data1) =>{
         if(data1 != "-1" && data1 != "-2"){
           this.pushNotify5();
         }
         else{
           this.pushNotify6();
           
         }
       })
     })
   }else {
     this.pushNotify6();
   }
  }

  public pushNotify5() {
    new Notify({
      status: 'success',
      title: '',
      text: 'Contraseña modificada correctamente',
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
    })
  }

  public pushNotify6() {
    new Notify({
      status: 'error',
      title: '',
      text: 'Error al modificar la contraseña',
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
    })
  }

  public pushNotify9() {
    new Notify({
      status: 'success',
      title: '',
      text: 'Perfil modificado correctamente',
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
    })
  }

  public pushNotify10() {
    new Notify({
      status: 'error',
      title: '',
      text: 'Error al modificar su perfil',
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
    })
  }


  ngOnInit(): void {
    
    this.verFavoritos();

  }

}
