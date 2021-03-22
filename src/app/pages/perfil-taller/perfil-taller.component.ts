import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  ngOnInit(): void {
  }

}
