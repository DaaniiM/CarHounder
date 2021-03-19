import { Component, OnInit } from '@angular/core';
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
      console.log("Error al insertar disco")
  })



 } 

  ngOnInit(): void {
  }

}
