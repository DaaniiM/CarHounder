import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/modules/cita';
import { Taller } from 'src/app/modules/taller';
import { CarApiService } from 'src/app/shared/car-api.service';

@Component({
  selector: 'app-modal-citas-taller',
  templateUrl: './modal-citas-taller.component.html',
  styleUrls: ['./modal-citas-taller.component.css']
})
export class ModalCitasTallerComponent implements OnInit {

  public cita: Cita;
  public servicios: any[];
  public serviciosCitas: string[];
  public AServicios: string;

  constructor(public carApiService: CarApiService) {

    this.serviciosCitas = [];
    this.AServicios;
  }


  public detallesServicios() {


    this.carApiService.buscarServicios().subscribe((data: any[]) => {
      this.servicios = data

      console.log(this.servicios)
    })
  }

  public anyadirServicio(servicio: string, idHtml: string) {
    var checkBox = document.getElementById(idHtml) as HTMLInputElement;
    console.log(idHtml)

    if (checkBox.checked == true) {
      console.log(servicio)
      this.serviciosCitas.push(" " + servicio);
      console.log(this.serviciosCitas);

    }
    else {
      console.log(servicio, this.serviciosCitas.indexOf(" " + servicio));
      this.serviciosCitas.splice(this.serviciosCitas.indexOf(" " + servicio), 1);
      console.log(this.serviciosCitas);

    }
  }

  public pedirCita(fecha: string, hora: string) {
    console.log(this.carApiService.taller)
    console.log(this.carApiService.clienteLogin);

    this.AServicios = this.serviciosCitas.toString();
    console.log(this.AServicios, typeof this.AServicios)

    this.carApiService.pedirCita(new Cita(this.AServicios, fecha, hora, this.carApiService.tallerLogin.id_taller, this.carApiService.citaCliente.id_cliente)).subscribe((data: any) => {
      if (data != "-1") {
        console.log(data)
        alert("Error al pedir la cita");
      }
      else {
        console.log(data)
        alert("Cita reservada con éxito");
      }
    })
  }

  ngOnInit(): void {
    this.detallesServicios();
  }

}
