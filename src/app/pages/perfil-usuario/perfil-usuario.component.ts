import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarApiService } from 'src/app/shared/car-api.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {


  constructor(public apiService:CarApiService,private _router: Router) {

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


  ngOnInit(): void {


  }

}
