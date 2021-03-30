import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/modules/login';
import { Oferta } from 'src/app/modules/oferta';
import { Taller } from 'src/app/modules/taller';
import { Usuario } from 'src/app/modules/usuario';
import { CarApiService } from '../../shared/car-api.service';

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
    if(data!="-1")
      console.log("Se anadio el usuario: " + data);
    else
      console.log("Error al insertar el usuario");
  });

  this.apiService.registrarLogin(new Login(email,password,"cliente")).subscribe((data1:any) =>{
    console.log(data1);
    if(data1!="-1")
      console.log("Se anadio el login " + data1);
    else
      console.log("Error al insertar el login");
  });
 } 



public agregarTaller(email:string, password:string, nombre:string, cif:string, direccion:string, cp:string, ciudad:string, provincia:string, telefono:string){

  this.apiService.registrarTaller(new Taller(0,email,password,nombre,cif,direccion,Number(cp),ciudad,provincia,Number(telefono),"../../assets/img/fotoFondos/perfilTaller.jpg")).subscribe((data:any) =>{
    console.log(data);
    if(data!="-1"){
      console.log("Se anadio el taller " + data);
      this.apiService.crearOferta(new Oferta(0,data,"No hay ofertas")).subscribe((data1:any) =>{
        console.log(data1);
        if(data1!="-1")
          console.log("Se anadio la oferta " + data1);
        else
          console.log("Error al insertar la oferta");
      });
    }else{
      console.log("Error al insertar el taller");
    }
  });
  this.apiService.registrarLogin(new Login(email,password,"taller")).subscribe((data1:any) =>{
    console.log(data1);
    if(data1!="-1")
      console.log("Se anadio el login " + data1);
    else
      console.log("Error al insertar el login");
  });
 } 

public loguearPagina(email:string,password:string){
  this.apiService.loguearse(new Login(email,password,"")).subscribe((data:any) =>{
    console.log(data);
    if(data!="-1" && data!="-2" && data.length != 0){
      console.log(data);
      this.apiService.login = data[0];
      if(this.apiService.login.rol == "cliente"){
        this.loginCliente(this.apiService.login.email);
      }else if(this.apiService.login.rol == "taller"){
        this.loginTaller(this.apiService.login.email);
      }
      this._router.navigate(['']);
    }else{
      console.log("Error al intentar loguearte");
    }
  });
 } 

 public loginTaller(email:string){
  this.apiService.loginTaller(email).subscribe((data3:any) =>{
    if(data3!="-1"){
      console.log(data3);
      this.apiService.tallerLogin = data3[0];
    }else{
      console.log("Error al intentar loguearte con taller");
    }
  });
 }

 
 public loginCliente(email:string){
  this.apiService.loginCliente(email).subscribe((data4:any) =>{
    if(data4!="-1"){
      console.log(data4);
      this.apiService.clienteLogin = data4[0];
    }else{
      console.log("Error al intentar loguearte con cliente");
    }
  });
 }

  ngOnInit(): void {
  }

}
