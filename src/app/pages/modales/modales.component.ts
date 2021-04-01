import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/modules/login';
import { Oferta } from 'src/app/modules/oferta';
import { Taller } from 'src/app/modules/taller';
import { Usuario } from 'src/app/modules/usuario';
import { CarApiService } from '../../shared/car-api.service';
import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.min.css'

@Component({
  selector: 'app-modales',
  templateUrl: './modales.component.html',
  styleUrls: ['./modales.component.css']
})
export class ModalesComponent implements OnInit {

  constructor(private apiService:CarApiService,private _router: Router) { }
  
 public agregarUsuario(email:string, password:string, nombre:string, apellidos:string, telefono:string){
  this.apiService.registrarCliente(new Usuario(0,email,password,nombre,apellidos,Number(telefono),"assets/img/fotoFondos/usuario.png")).subscribe((data:any) =>{
    console.log(data);
    if(data!="-1" && data!="-2")
      this.pushNotify();
    else
      this.pushNotify3();
  });
  this.apiService.registrarLogin(new Login(email,password,"cliente")).subscribe((data1:any) =>{
    if(data1!="-1" && data1!="-2")
      console.log("login ok");
    else
      console.log("Error login");
  });
 } 

public agregarTaller(email:string, password:string, nombre:string, cif:string, direccion:string, cp:string, ciudad:string, provincia:string, telefono:string){
  this.apiService.registrarTaller(new Taller(0,email,password,nombre,cif,direccion,Number(cp),ciudad,provincia,Number(telefono),"../../assets/img/fotoFondos/perfilTaller.jpg")).subscribe((data:any) =>{
    if(data!="-1" && data!="-2"){
      this.pushNotify();
      this.apiService.crearOferta(new Oferta(0,data,"No hay ofertas")).subscribe((data1:any) =>{
        if(data1!="-1" && data!="-2")
          console.log("oferta ok");
        else
          console.log("Error oferta");
      });
    }else{
      this.pushNotify3();
    }
  });
  this.apiService.registrarLogin(new Login(email,password,"taller")).subscribe((data1:any) =>{
    if(data1!="-1" && data1!="-2")
      console.log("login ok");
    else
      console.log("Error login");
  });
 } 

public loguearPagina(email:string,password:string){
  this.apiService.loguearse(new Login(email,password,"")).subscribe((data:any) =>{
    console.log(data);
    if(data!="-1" && data!="-2" && data.length != 0){
      this.apiService.login = data[0];
      if(this.apiService.login.rol == "cliente"){
        this.loginCliente(this.apiService.login.email);
      }else if(this.apiService.login.rol == "taller"){
        this.loginTaller(this.apiService.login.email);
      }
      this._router.navigate(['']);
      this.pushNotify1();
    }else{
      this.pushNotify2();
    }
  });
 } 

 public loginTaller(email:string){
  this.apiService.loginTaller(email).subscribe((data3:any) =>{
    if(data3!="-1" && data3!="-2"){
      this.apiService.tallerLogin = data3[0];
    }else{
      console.log("Error login taller");
    }
  });
 }

  public loginCliente(email:string){
  this.apiService.loginCliente(email).subscribe((data4:any) =>{
    if(data4!="-1" && data4!="-2"){
      this.apiService.clienteLogin = data4[0];
    }else{
      console.log("Error login cliente");
    }
  });
 }

 public pushNotify() {
  new Notify({
    status: 'success',
    title: '',
    text: 'Se ha registrado satisfactoriamente.',
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

public pushNotify1() {
  new Notify({
    status: 'success',
    title: '',
    text: 'Se ha iniciado sesión correctamente.',
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
    status: 'error',
    title: '',
    text: 'Correo y contraseña no coinciden.',
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
    text: 'Error al intentar registrarse.',
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
  }

}
