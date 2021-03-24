import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarApiService } from 'src/app/shared/car-api.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  constructor(private carApiService:CarApiService, private _router: Router) { }

  public citas:any;
  public servicios:any[];

  public mostrarCitas() {
    
    this.carApiService.mostrarCita(this.carApiService.clienteLogin.id_cliente).subscribe((data:any) => {
      console.log(data);
      this.citas = data;
      console.log(this.citas);
    })
  }

  public borrarCitas(idTaller:number, idReserva:number) {
    
    this.carApiService.borrarCita(idTaller, this.carApiService.clienteLogin.id_cliente, idReserva).subscribe((data:any) => {
      console.log(data);
      console.log(this.citas.id_taller, this.carApiService.clienteLogin.id_cliente)
      if(data=="-1")
      alert("Su cita ha sido cancelada");
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
    this.mostrarCitas()

    this.detallesServicios()
  }

}
