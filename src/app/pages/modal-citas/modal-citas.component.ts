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
  public taller: Taller;
  public servicios: any[];
  public serviciosCitas: string[];
  public AServicios: string;

  constructor(private carApiService: CarApiService) {

    this.taller = carApiService.taller;
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

    this.carApiService.pedirCita(new Cita(this.AServicios, fecha, hora, this.carApiService.taller.id_taller, this.carApiService.clienteLogin.id_cliente)).subscribe((data: any) => {
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

  

  // public pasarString() {

  //   this.AServicios = this.serviciosCitas.toString();
  //   console.log(this.AServicios, typeof this.AServicios)

  //   this.carApiService.citasServicios(this.AServicios).subscribe((data: any) => {
  //     console.log(data)
  //   })
  // }

  ngOnInit(): void {
    this.detallesServicios()
  }

}
