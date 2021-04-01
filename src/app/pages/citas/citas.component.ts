import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Notify from 'simple-notify';
import 'simple-notify/dist/simple-notify.min.css'
import { Cita } from 'src/app/modules/cita';
import { Usuario } from 'src/app/modules/usuario';
import { CarApiService } from 'src/app/shared/car-api.service';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  public citas:any;
  public servicios:any[];
  public serviciosCitas:string[];
  public login:any;
  public fechacita: any;
  public idCapturadanumber:number;
  public arrayServicios: string[];
  public arrayIconos: any[];
  public AServicios: string;
  public IdclienteNuevo: any;
  public nombreP: string;
  public fechaP: string;
  public horaP: string;
  public horas: any[]
  public horasRes: any[]
  public mostrarHoras: any[];
  public fechaFiltrada: any;


  constructor(public carApiService:CarApiService, private _router: Router) { 

    this.login = carApiService.login;
    this.fechacita;
    this.idCapturadanumber = null;
    this.serviciosCitas = [];
    this.AServicios;
    this.IdclienteNuevo = null;
    this.fechaFiltrada;
    this.horas=["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
                "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"]
    this.mostrarHoras = [];
  }

  public mostrarCitasCliente() {
    this.carApiService.mostrarCitaCliente(this.carApiService.clienteLogin.id_cliente).subscribe((data:any) => {
      this.citas = data;
    });
  }

  public mostrarCitasTaller() {
    this.carApiService.mostrarCitaTaller(this.carApiService.tallerLogin.id_taller).subscribe((data:any) => {
      this.citas = data;
    });
  }

  public borrarCitasCliente() {
    this.carApiService.borrarCitaCliente(this.carApiService.clienteLogin.id_cliente, this.idCapturadanumber).subscribe((data:any) => {
      if(data!="-1" && data != "-2"){
        this.pushNotify2();
        this.ngOnInit();
      }
      else{
        this.pushNotify6();
        this.ngOnInit();
      }
    });
  }

  public borrarCitasTaller() {
    this.carApiService.borrarCitaTaller(this.carApiService.tallerLogin.id_taller, this.idCapturadanumber).subscribe((data:any) => {
      if(data!="-1" && data !="-2"){
        this.pushNotify2();
        this.ngOnInit();
      }
      else{
        this.pushNotify6();
        this.ngOnInit();
      }
    });
  }

  public capturar(id:any){
    this.idCapturadanumber = id;
    this.carApiService.idReserva = id;
  }

  public prueba(fecha: string, hora: string){
    this.carApiService.fechaP = fecha;
    this.carApiService.horaP = hora;
  }

  // Modal citas del taller (Añadir y modificar)

  public detallesServicios() {
    this.carApiService.buscarServicios().subscribe((data: any[]) => {
      this.servicios = data;
    });
  }

  public anyadirServicio(servicio: string, idHtml: string) {
    var checkBox = document.getElementById(idHtml) as HTMLInputElement;
    if (checkBox.checked == true) {
      this.serviciosCitas.push(" " + servicio);
    }
    else {
      this.serviciosCitas.splice(this.serviciosCitas.indexOf(" " + servicio), 1);

    }
  }

  public registrarCliente(nombre: string, apellidos: string, telefono: string, fecha: string, hora: string){
    this.carApiService.registrarCliente(new Usuario(0, null, "1", nombre, apellidos, Number(telefono), null)).subscribe((data:any) =>{
      if(data!="-1" && data != "-2"){
        this.AServicios = this.serviciosCitas.toString();
        this.carApiService.pedirCita(new Cita(this.AServicios, fecha, hora, this.carApiService.tallerLogin.id_taller, data)).subscribe((data: any) => {
          if (data != "-1" && data != "-2") {
            console.log(data)
            this.pushNotify();
            this.ngOnInit();
          }
          else {
            this.pushNotify4();
            this.ngOnInit();
          }
       });
      }
      else{
        this,this.pushNotify7();
      }
    });
  }

  public modificarCita(fecha:any, hora: string){
    this.AServicios = this.serviciosCitas.toString();
    console.log(this.carApiService.idReserva)
    this.carApiService.modificarCita(new Cita(this.AServicios, fecha, hora, 0, 0, this.carApiService.idReserva)).subscribe((data: any) => {
      if (data != "-1" && data != "-2") {
        this.pushNotify3();
        this.ngOnInit();
      }
      else {
        this.pushNotify5();
        this.ngOnInit();
      }
    });
  }

  public calendarioM(){
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
    document.getElementById("fechaM").setAttribute("min", today);
  }

  public calendarioA(){
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
    document.getElementById("fechaA").setAttribute("min", today);
  }

  public mostrarHorasReservadas(){
    this.carApiService.mostrarHoras(this.carApiService.tallerLogin.id_taller).subscribe((data: any[]) => {
      this.carApiService.horasReservadas = data;
      console.log(data)
    });
  }

  public actualizarHoras(){
    this.mostrarHoras = []
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
      status: 'success',
      title: '',
      text: 'Cita cancelada correctamente',
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
      status: 'success',
      title: '',
      text: 'Cita modificada correctamente',
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

  public pushNotify4() {
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

  public pushNotify5() {
    new Notify({
      status: 'error',
      title: '',
      text: 'Error al modificar su cita',
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

  public pushNotify6() {
    new Notify({
      status: 'error',
      title: '',
      text: 'Error al cancelar su cita',
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

  public pushNotify7() {
    new Notify({
      status: 'error',
      title: '',
      text: 'Error al insertar el cliente',
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
    this.calendarioM();
    this.calendarioA();
    this.mostrarHorasReservadas();
   
  }

}
