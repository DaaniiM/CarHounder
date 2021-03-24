import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/modules/login';
import { Oferta } from 'src/app/modules/oferta';
import { Taller } from 'src/app/modules/taller';
import { TalleresServicios } from 'src/app/modules/talleres-servicios';
import { CarApiService } from 'src/app/shared/car-api.service';

@Component({
  selector: 'app-perfil-taller',
  templateUrl: './perfil-taller.component.html',
  styleUrls: ['./perfil-taller.component.css']
})
export class PerfilTallerComponent implements OnInit {

  public oferta1: Oferta;
  public servicios1: any[];


  constructor(public apiService:CarApiService,private _router: Router) {

 

   }

  public ofertas1(){

    this.apiService.oferta(this.apiService.tallerLogin.id_taller).subscribe((data:any[]) => {
      this.oferta1=data[0]
      
      console.log(this.oferta1)
    })

  }


  public anyadirServicio(id_servicios:number,idHtml:string) {
    var checkBox = document.getElementById(idHtml) as HTMLInputElement;

    if (checkBox.checked == true){

      this.apiService.insertarServicio(new TalleresServicios(this.apiService.tallerLogin.id_taller,id_servicios)).subscribe((data:any[]) => {
      
        console.log(data)
      })

    } else {

      this.apiService.eliminarServicio(id_servicios,this.apiService.tallerLogin.id_taller).subscribe((data3:any) =>{
        
        if(data3!="-1"){

          console.log(data3)
          
          
        }else{
          console.log("Error al intentar eliminar el taller")
        }
      })
  

    }
  }



  

  public eliminarTaller(){


    this.apiService.eliminarTaller(this.apiService.taller.id_taller).subscribe((data3:any) =>{
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

   public editarTaller(email:string, password: string, nombre:string, cif:string, direccion:string, cp:any, ciudad:string, provincia:string, telefono:any, foto:string, nuevaOferta:string){

  
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

        this.apiService.editarOferta(new Oferta(0,this.apiService.tallerLogin.id_taller,nuevaOferta)).subscribe((data1) =>{
          if(data1){
            console.log(data1);
          }
          else{
            console.log("Error al intentar modificar la oferta");
          }
        })

        console.log(data)
        
      }else{
        console.log("Error al intentar modificar el taller");
      }
    })

   }


   public detallesServicios() {
  
    
    this.apiService.detallesOfertaTaller(this.apiService.tallerLogin.id_taller).subscribe((data:any[]) => {
      this.servicios1=data


      for(let servicio of this.servicios1){


        let servicioCheck = document.getElementById(`${servicio.id_servicios}`) as HTMLInputElement;

        servicioCheck.checked = true;

      }

      
      console.log(this.servicios1)
    })

    

  }
 

  

  ngOnInit(): void {

    this.ofertas1();
    this.detallesServicios();

  }

}
