import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cita } from 'src/app/modules/cita';
import { Usuario } from 'src/app/modules/usuario';
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
  public IdclienteNuevo: any;

  public nombreP: string;
  public fechaP: string;
  public horaP: string;

  constructor(public carApiService: CarApiService, private _router: Router) {

    this.serviciosCitas = [];
    this.AServicios;
    this.IdclienteNuevo = null;

    this.nombreP = this.carApiService.nombreP;
    this.fechaP = this.carApiService.fechaP;
    this.horaP = this.carApiService.horaP;
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

  // public pedirCita(fecha: string, hora: string) {
  //   console.log(this.carApiService.taller)
  //   console.log(this.carApiService.clienteLogin);

  //   this.AServicios = this.serviciosCitas.toString();
  //   console.log(this.AServicios, typeof this.AServicios)

  //   this.carApiService.pedirCita(new Cita(this.AServicios, fecha, hora, this.carApiService.tallerLogin.id_taller, this.carApiService.citaCliente.id_cliente)).subscribe((data: any) => {
  //     if (data != "-1") {
  //       console.log(data)
  //       alert("Error al pedir la cita");
  //     }
  //     else {
  //       console.log(data)
  //       alert("Cita reservada con éxito");
  //     }
  //   })
  // }

  public registrarCliente(nombre: string, apellidos: string, telefono: string){
    this.carApiService.registrarCliente(new Usuario(0, null, null, nombre, apellidos, Number(telefono), null)).subscribe((data:any) =>{
      console.log(data);
      this.IdclienteNuevo = data;
      if(data!="-1"){
        console.log("Se anadio el cliente: " + data);
      }
      else{
        console.log("Error al insertar el cliente")
      }
    })

    // this.carApiService.mostrarClienteNuevo(nombre, Number(telefono)).subscribe((data:any) =>{
    //   this.IdclienteNuevo = data;
    //   console.log(data);
      
    // })
  }

  public anyadirCita(fecha:string, hora:string){
    
    this.AServicios = this.serviciosCitas.toString();
    console.log(this.IdclienteNuevo)
    this.carApiService.pedirCita(new Cita(this.AServicios, fecha, hora, this.carApiService.tallerLogin.id_taller, this.IdclienteNuevo)).subscribe((data: any) => {
      if (data != "-1") {
        console.log(data)
        alert("Error al pedir la cita");
        this.ngOnInit();
      }
      else {
        this.IdclienteNuevo = null;
        console.log(data)
        alert("Cita reservada con éxito");
        this.ngOnInit();
      }
    })
  }
  
  public prueba(nombre, fecha, hora){
    console.log(nombre, fecha, hora)
  }

  public modificarCita(fecha:any, hora: string){
    this.AServicios = this.serviciosCitas.toString();
    console.log(this.carApiService.idReserva)
    this.carApiService.modificarCita(new Cita(this.AServicios, fecha, hora, 0, 0, this.carApiService.idReserva)).subscribe((data: any) => {
      if (data != "-1") {
        console.log(data)
        console.log("Error al pedir la cita");
        
        
      }
      else {
        console.log(data)
        console.log("Cita reservada con éxito");
      }
    })
  }

  public calendario(){
    var today: any = new Date();
    var dd: any = today.getDate()+1;
    var mm: any = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
    var yyyy = today.getFullYear();
    if(dd<10){
      dd='0'+dd
    } 
    if(mm<10){
      mm='0'+mm
    } 
    
    today = yyyy+'-'+mm+'-'+dd;
    document.getElementById("fechaM").setAttribute("min", today);
  }
  

  ngOnInit(): void {
    this.detallesServicios();

    this.calendario();

    

    
    
  }

}
