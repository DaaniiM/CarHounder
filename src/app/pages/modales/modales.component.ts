import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/modules/login';
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






  
 public agregarUsuario(email:string, password:string, nombre:string, apellidos:string, telefono:string, foto:string){

  this.apiService.registrarCliente(new Usuario(0,email,password,nombre,apellidos,Number(telefono),foto)).subscribe((data:any) =>{
    console.log(data);
    if(data!="-1")
      console.log("Se anadio el usuario: " + data);

    else
      console.log("Error al insertar el usuario")
  })

  this.apiService.registrarLogin(new Login(0,email,password,"cliente")).subscribe((data1:any) =>{
    console.log(data1);
    if(data1!="-1")
      console.log("Se anadio el login " + data1);

    else
      console.log("Error al insertar el login")
  })
 } 



//  public comprobarClave(clave1,clave2,funcion){

//   if (clave1 == clave2){

//     funcion;

//   }else{

//     alert("Las contraseñas no son iguales")

//   }
    
// }

public agregarTaller(email:string, password:string, nombre:string, cif:string, direccion:string, cp:string, ciudad:string, provincia:string, telefono:string, foto:string){

  this.apiService.registrarTaller(new Taller(0,email,password,nombre,cif,direccion,Number(cp),ciudad,provincia,Number(telefono),foto)).subscribe((data:any) =>{
    console.log(data);
    if(data!="-1")
      console.log("Se anadio el taller " + data);

    else
      console.log("Error al insertar el taller")
  })

  this.apiService.registrarLogin(new Login(0,email,password,"taller")).subscribe((data1:any) =>{
    console.log(data1);
    if(data1!="-1")
      console.log("Se anadio el login " + data1);

    else
      console.log("Error al insertar el login")
  })
 } 

//  public agregarLogin(email:string, rol:string){


//  } 

public loguearPagina(email:string,password:string){

  this.apiService.loguearse(new Login(0,email,password,"")).subscribe((data:any) =>{
    if(data!="-1" && data.length != 0){
      console.log(data);
      this.apiService.login = data[0];


      if(this.apiService.login.rol == "cliente"){

        this.loginCliente(this.apiService.login.email);


      

      }else if(this.apiService.login.rol == "taller"){

        this.loginTaller(this.apiService.login.email);
      

       
        
      }

      this._router.navigate(['']);

 

    }else{
      console.log("Error al intentar loguearte")
    }
  })
 } 
 

 public loginTaller(email:string){


  this.apiService.loginTaller(email).subscribe((data3:any) =>{
    if(data3!="-1"){
      console.log(data3);
      this.apiService.tallerLogin = data3[0];


    }else{
      console.log("Error al intentar loguearte con taller")
    }
  })
 }

 
 public loginCliente(email:string){


  this.apiService.loginCliente(email).subscribe((data4:any) =>{
    if(data4!="-1"){
      console.log(data4);
      this.apiService.clienteLogin = data4[0];


    }else{
      console.log("Error al intentar loguearte con cliente")
    }
  })
 }



  ngOnInit(): void {
  }

}
