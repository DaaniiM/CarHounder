
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarApiService } from 'src/app/shared/car-api.service';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  public citas:any;
  public servicios:any[];
  public serviciosCita:string;
  public login:any;
  public fechacita: any;

  constructor(private carApiService:CarApiService, private _router: Router) { 

    this.login = carApiService.login;
    this.fechacita;
  }


  public mostrarCitasCliente() {
    
    this.carApiService.mostrarCitaCliente(this.carApiService.clienteLogin.id_cliente).subscribe((data:any) => {
      console.log(data);
      this.citas = data;
      this.carApiService.citaCliente = data;
    })
  }

  public mostrarCitasTaller() {
    
    this.carApiService.mostrarCitaTaller(this.carApiService.tallerLogin.id_taller).subscribe((data:any) => {
      console.log(data);
      this.citas = data;
      this.carApiService.citaTaller = data;
    })
  }

  public borrarCitasCliente(idTaller:number, idReserva:number) {
    
    this.carApiService.borrarCitaCliente(idTaller, this.carApiService.clienteLogin.id_cliente, idReserva).subscribe((data:any) => {
      console.log(data);
      console.log(this.citas.id_taller, this.carApiService.clienteLogin.id_cliente)
      if(data=="-1")
      alert("La cita ha sido cancelada");
      else
      alert("Error al cancelar la cita");
      
      
    });
    this._router.navigate(['/perfilUsuario']);
  }

  public borrarCitasTaller(idCliente:number, idReserva:number) {
    
    this.carApiService.borrarCitaTaller(this.carApiService.tallerLogin.id_taller, idCliente, idReserva).subscribe((data:any) => {
      console.log(data);
      console.log(this.citas.id_taller, this.carApiService.clienteLogin.id_taller)
      if(data=="-1")
      alert("La cita ha sido cancelada");
      else
      alert("Error al cancelar la cita");
      
      
    });
    this._router.navigate(['/perfilUsuario']);
  }

  public detallesServicios() {
  
    
    this.carApiService.buscarServicios().subscribe((data:any[]) => {
      this.servicios=data
      
      console.log(this.servicios)
    })
  }


  ngOnInit(): void {

    if (this.carApiService.login.rol == "cliente"){
      this.mostrarCitasCliente()
      console.log(this.carApiService.login.rol);
      console.log(this.carApiService.clienteLogin.id_cliente);
    }
    else{
      this.mostrarCitasTaller()
      console.log(this.carApiService.login.rol)
      console.log(this.carApiService.tallerLogin.id_taller);
    }
    
    this.detallesServicios()

    console.log(this.login)
    
    
  }

}
