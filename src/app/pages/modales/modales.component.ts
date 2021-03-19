import { Component, OnInit } from '@angular/core';
import { Taller } from 'src/app/modules/taller';
import { Usuario } from 'src/app/modules/usuario';
import { CarApiService } from '../../shared/car-api.service';

@Component({
  selector: 'app-modales',
  templateUrl: './modales.component.html',
  styleUrls: ['./modales.component.css']
})
export class ModalesComponent implements OnInit {

  constructor(private apiService:CarApiService) { }






  
 public agregarUsuario(email:string, password:string, nombre:string, apellidos:string, telefono:string, foto:string){

  this.apiService.registrarCliente(new Usuario(0,email,password,nombre,apellidos,Number(telefono),foto)).subscribe((data:any) =>{
    console.log(data);
    if(data!="-1")
      console.log("Se anadio el usuario: " + data);

    else
      console.log("Error al insertar el usuario")
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
 } 


  ngOnInit(): void {
  }

}
