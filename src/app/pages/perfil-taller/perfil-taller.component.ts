import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/modules/login';
import { Taller } from 'src/app/modules/taller';
import { CarApiService } from 'src/app/shared/car-api.service';

@Component({
  selector: 'app-perfil-taller',
  templateUrl: './perfil-taller.component.html',
  styleUrls: ['./perfil-taller.component.css']
})
export class PerfilTallerComponent implements OnInit {

  constructor(public apiService:CarApiService,private _router: Router) { }

  public eliminarTaller(){


    this.apiService.eliminarTaller(this.apiService.tallerLogin.id_taller).subscribe((data3:any) =>{
      if(data3!="-1"){

        this.apiService.tallerLogin = undefined;
        this.apiService.eliminarLogin(this.apiService.login.email).subscribe((data3:any) =>{
          if(data3!="-1"){
                
            this.apiService.login = undefined;
            this._router.navigate(['']);
    
    
            }else{
            console.log("Error al intentar eliminar el taller")
          }
        })
        
        
      }else{
        console.log("Error al intentar eliminar el taller")
      }
    })

   }

   public editarTaller(email:string, password: string, nombre:string, cif:string, direccion:string, cp:any, ciudad:string, provincia:string, telefono:any, foto:string){

  
    this.apiService.editarTaller(new Taller(this.apiService.tallerLogin.id_taller, email, password, nombre, cif, direccion, Number(cp), ciudad, provincia,Number(telefono), foto)).subscribe((data:any) =>{
      if(data!="-1"){

        this.apiService.tallerLogin = new Taller(this.apiService.tallerLogin.id_taller, email, password, nombre, cif, direccion, Number(cp), ciudad, provincia,Number(telefono), foto);

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
  }

}
