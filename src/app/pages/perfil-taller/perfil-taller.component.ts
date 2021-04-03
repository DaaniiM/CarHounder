import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/modules/login';
import { Oferta } from 'src/app/modules/oferta';
import { Taller } from 'src/app/modules/taller';
import { TalleresServicios } from 'src/app/modules/talleres-servicios';
import { CarApiService } from 'src/app/shared/car-api.service';
import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.min.css'

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
      this.oferta1=data[0];
    });
  }


  public anyadirServicio(id_servicios:number,idHtml:string) {
    var checkBox = document.getElementById(idHtml) as HTMLInputElement;
    if (checkBox.checked == true){
      this.apiService.insertarServicio(new TalleresServicios(this.apiService.tallerLogin.id_taller,id_servicios)).subscribe((data:any) => {
        if(data!="-1" && data!="-2"){
          this.pushNotify();
        }else{
          this.pushNotify3();
        }
      });
    } else {
      this.apiService.eliminarServicio(id_servicios,this.apiService.tallerLogin.id_taller).subscribe((data3:any) =>{
        if(data3!="-1" && data3!="-2"){
          this.pushNotify2();
        }else{
          this.pushNotify4();
        }
      });
    }
  }

  public eliminarTaller(){
    this.apiService.eliminarTaller(this.apiService.tallerLogin.id_taller).subscribe((data3:any) =>{
      if(data3!="-1" && data3!="-2"){
        this.apiService.tallerLogin = undefined;
        this.apiService.eliminarLogin(this.apiService.login.email).subscribe((data3:any) =>{
          if(data3!="-1" && data3!="-2"){
            this.apiService.login = undefined;
            this._router.navigate(['']);
            this.pushNotify12();
            }else{
              console.log("Error eliminar login")
          }
        });
      }else{
        this.pushNotify11();
      }
    });
   }

   public editarTaller(email:string, nombre:string, cif:string, direccion:string, cp:any, ciudad:string, provincia:string, telefono:any, foto:string, nuevaOferta:string){
    this.apiService.editarTaller(new Taller(this.apiService.tallerLogin.id_taller, email, "", nombre, cif, direccion, Number(cp), ciudad, provincia,Number(telefono), foto)).subscribe((data:any) =>{
      if(data!="-1" && data!="-2"){
        this.apiService.tallerLogin = new Taller(this.apiService.tallerLogin.id_taller, email, "", nombre, cif, direccion, Number(cp), ciudad, provincia,Number(telefono), foto);
        this.apiService.editarOferta(new Oferta(0,this.apiService.tallerLogin.id_taller,nuevaOferta)).subscribe((data1) =>{
          if(data1!="-1" && data1!="-2"){
            console.log("oferta ok");
          }
          else{
            this.pushNotify10();
          }
        })
        this.pushNotify9();
      }else{
       this.pushNotify10();
      }
    });
   }
   
   public password_Anterior(passwordAnterior:string, passwordNuevo:string, passwordRepetido:string) {
     this.apiService.passwordAnterior(passwordAnterior,this.apiService.tallerLogin.id_taller).subscribe((data) => {
       if (data != "-1" && data != "-2") {
         this.editarPassword(passwordNuevo, passwordRepetido);
       } else {
         this.pushNotify6();
       }
     });
   }

   public editarPassword(passwordNuevo:string, passwordRepetido:string) {
    if(passwordNuevo == passwordRepetido) {
      this.apiService.editarPassword(new Taller(this.apiService.tallerLogin.id_taller, "", passwordNuevo, "", "", "", 0, "", "",0, "")).subscribe((data:any) =>  {
        this.apiService.editarLogin(new Login(this.apiService.tallerLogin.email, passwordNuevo)).subscribe((data1) =>{
          if(data1 != "-1" && data1 != "-2"){
            this.pushNotify5();
          }
          else{
            this.pushNotify6();
          }
        });
      });
    }else {
      this.pushNotify6();
    }
   }

   public detallesServicios() {
    this.apiService.detallesOfertaTaller(this.apiService.tallerLogin.id_taller).subscribe((data:any[]) => {
      this.servicios1=data
      for(let servicio of this.servicios1){
        let servicioCheck = document.getElementById(`${servicio.id_servicios}`) as HTMLInputElement;
        servicioCheck.checked = true;
      }
    });
  }


  public editarFotoTaller(foto:string){
    this.apiService.cambiarFotoTaller(foto.replace(/^.*\\/, ""),this.apiService.tallerLogin.id_taller).subscribe((data:any) =>{
      console.log(data)
      if(data!="-1" && data!="-2"){
        this.apiService.tallerLogin.foto = foto.replace(/^.*\\/, "");        
        this.pushNotify13();
      }else{
        this.pushNotify14();
      }
    })
   }


  public pushNotify() {
    new Notify({
      status: 'success',
      title: '',
      text: 'Se ha añadido este servicio a su taller',
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
    });
  }

  public pushNotify2() {
    new Notify({
      status: 'warning',
      title: '',
      text: 'Se ha eliminado este servicio de su taller',
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
    });
  }
 
  
  public pushNotify3() {
    new Notify({
      status: 'error',
      title: '',
      text: 'Error al añadir el servicio',
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
    });
  }
 
  
  public pushNotify4() {
    new Notify({
      status: 'error',
      title: '',
      text: 'Error al eliminar el servicio',
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
    });
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
    });
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
    });
  }

  public pushNotify7() {
    new Notify({
      status: 'success',
      title: '',
      text: 'Foto modificada correctamente',
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
    });
  }

  public pushNotify8() {
    new Notify({
      status: 'error',
      title: '',
      text: 'Error al modificar la foto',
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
    });
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
    });
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
    });
  }

  public pushNotify11() {
    new Notify({
      status: 'error',
      title: '',
      text: 'Error al elimirar su perfil',
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
    });
  }

  public pushNotify12() {
    new Notify({
      status: 'success',
      title: '',
      text: 'Perfil eliminado correctamente',
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
    });
  }

  public pushNotify13() {
    new Notify({
      status: 'success',
      title: '',
      text: 'Foto modificada correctamente',
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
    });
  }

  public pushNotify14() {
    new Notify({
      status: 'error',
      title: '',
      text: 'Error al modificar la foto',
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
    });
  }


  ngOnInit(): void {

    this.ofertas1();
    this.detallesServicios();

  }

}
