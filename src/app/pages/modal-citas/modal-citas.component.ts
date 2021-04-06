import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/modules/cita';
import { Taller } from 'src/app/modules/taller';
import { CarApiService } from 'src/app/shared/car-api.service';
import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.min.css'

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
  public horas: any[];
  public fechaFiltrada: any;
  public mostrarHoras:any[];
  public clicked: boolean;

  constructor(public carApiService: CarApiService) {

    this.taller = carApiService.taller;
    this.serviciosCitas = [];
    this.AServicios;
    this.fechaFiltrada;
    this.horas = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
                  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"];
    this.mostrarHoras = [];
    this.clicked = false;

  }


  public detallesServicios() {
    this.carApiService.buscarServicios().subscribe((data: any[]) => {
      this.servicios = data;
    });
  }

  public anyadirServicio(icono: string, idHtml: string) {
    var checkBox = document.getElementById(idHtml) as HTMLInputElement;
    if (checkBox.checked == true) {
      this.serviciosCitas.push(" " + icono);
    }
    else {
      this.serviciosCitas.splice(this.serviciosCitas.indexOf(" " + icono), 1);
    }
  }

  public pedirCita(fecha: string, hora: string) {
    if(fecha!=""&& hora != ""){
      this.AServicios = this.serviciosCitas.toString();
      this.carApiService.pedirCita(new Cita(this.AServicios, fecha, hora, this.carApiService.taller.id_taller, this.carApiService.clienteLogin.id_cliente)).subscribe((data: any) => {
        if (data != "-1" && data != "-2") {
          this.pushNotify();
        }
        else {
          this.pushNotify2();
        }
      });
    }
    else{
      this.pushNotify3();
    }
    
  };

public calendario(){
  var today: any = new Date();
  var dd: any = today.getDate()+1;
  var mm: any = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
  var yyyy = today.getFullYear();
  if((mm==1||3||5||7||8||10||12) && dd==32){
    dd=+1;
    mm = mm+1;
  }
  else if((mm==4||6||9||11) && dd==31){
    dd=+1;
    mm = mm+1;
  }
  else if(mm==2 && dd==29){
    dd=+1;
    mm = mm+1;
  }
  else if(mm==2 && dd==30){
    dd=+1;
    mm = mm+1;
  }
  if(dd<10){
    dd='0'+dd
  }
  if(mm<10){
    mm='0'+mm
  }
  today = yyyy+'-'+mm+'-'+dd;
  document.getElementById("fecha").setAttribute("min", today);
};

public mostrarHorasReservadas(){
  this.carApiService.mostrarHoras(this.carApiService.taller.id_taller).subscribe((data: any[]) => {
    this.carApiService.horasReservadas = data;
  });
}

  public actualizarHoras(){
    this.mostrarHoras = [];
    for (let i = 0; i < this.horas.length; i++) {
      let match = false;
      for (let j = 0; j < this.carApiService.horasReservadas.length; j++) {
          if (this.horas[i] == this.carApiService.horasReservadas[j].hora && this.fechaFiltrada == this.carApiService.horasReservadas[j].fecha) {
              match = true;
              break;
          }
      }
      if (!match) {
          this.mostrarHoras.push(this.horas[i]);
      }
    }
  }

  public pushNotify() {
    new Notify({
      status: 'success',
      title: '',
      text: 'Cita reservada correctamente',
      effect: 'fade',
      speed: 300,
      customClass: null,
      customIcon: null,
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 3000,
      gap: 60,
      distance: 20,
      type: 1,
      position: 'right top'
    });
  }

  public pushNotify2() {
    new Notify({
      status: 'error',
      title: '',
      text: 'Error al reservar su cita',
      effect: 'fade',
      speed: 300,
      customClass: null,
      customIcon: null,
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 3000,
      gap: 60,
      distance: 20,
      type: 1,
      position: 'right top'
    });
  }

  public pushNotify3() {
    new Notify({
      status: 'error',
      title: '',
      text: 'Debe rellenar todos los campos',
      effect: 'fade',
      speed: 300,
      customClass: null,
      customIcon: null,
      showIcon: true,
      showCloseButton: true,
      autoclose: true,
      autotimeout: 3000,
      gap: 60,
      distance: 20,
      type: 1,
      position: 'right top'
    });
  }

  ngOnInit(): void {
    this.detallesServicios()
    this.calendario();
  }

}
