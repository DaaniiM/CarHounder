import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/modules/cita';
import { Taller } from 'src/app/modules/taller';
import { CarApiService } from 'src/app/shared/car-api.service';

@Component({
  selector: 'app-modal-citas',
  templateUrl: './modal-citas.component.html',
  styleUrls: ['./modal-citas.component.css']
})
export class ModalCitasComponent implements OnInit {

  public cita: Cita;
  
  constructor(private carApiService:CarApiService) { 
  }

  public pedirCita(fecha:string, hora:string){
    console.log(this.carApiService.taller)
    console.log(this.carApiService.clienteLogin)

    this.carApiService.pedirCita(new Cita(fecha, hora, this.carApiService.taller.id_taller, this.carApiService.clienteLogin.id_cliente)).subscribe((data:any) => {
      if (data != "-1"){
        console.log(data)
        alert("Error al pedir la cita");
      }
      else{
        console.log(data)
        alert("Cita reservada con éxito");
      }
    })
  }

  ngOnInit(): void {
  }

}
