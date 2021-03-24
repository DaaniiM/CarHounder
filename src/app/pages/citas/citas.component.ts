import { Component, OnInit } from '@angular/core';
import { CarApiService } from 'src/app/shared/car-api.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  constructor(private carApiService:CarApiService) { }

  public cita:any;

  public mostrarCitas() {
    
    this.carApiService.mostrarCita(this.carApiService.clienteLogin.id_cliente).subscribe((data:any) => {
      console.log(data);
      this.cita = data
      console.log(this.cita)

    })

    

  }

  ngOnInit(): void {
    this.mostrarCitas()
  }

}
