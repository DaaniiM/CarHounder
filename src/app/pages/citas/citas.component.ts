import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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


  public filtrarHoras(){

  }

  public mostrarCitasCliente() {
    
    this.carApiService.mostrarCitaCliente(this.carApiService.clienteLogin.id_cliente).subscribe((data:any) => {
      console.log(data);
      this.citas = data;
      // this.carApiService.citaCliente = data;
      for(let i=0; this.citas.length; i++){
        this.arrayServicios += this.citas[i].servicios
      }
      console.log(this.arrayServicios)
      this.arrayServicios = this.citas.servicios.split(",")
      console.log(this.arrayServicios)
    })
  }

  public mostrarCitasTaller() {
    
    this.carApiService.mostrarCitaTaller(this.carApiService.tallerLogin.id_taller).subscribe((data:any) => {
      console.log(data);
      this.citas = data;
      // this.carApiService.citaTaller = data;
    })
  }

  public borrarCitasCliente() {
    this.carApiService.borrarCitaCliente(this.carApiService.clienteLogin.id_cliente, this.idCapturadanumber).subscribe((data:any) => {
      console.log(data);
      console.log(this.citas.id_taller, this.carApiService.clienteLogin.id_cliente, this.idCapturadanumber)
      if(data=="-1"){
        console.log("La cita ha sido cancelada");
        this.ngOnInit();
      }
      
      else{
        console.log("Error al cancelar la cita");
        this.ngOnInit();
      }
    });
  }

  public borrarCitasTaller() {
    console.log(this.carApiService.tallerLogin)
    this.carApiService.borrarCitaTaller(this.carApiService.tallerLogin.id_taller, this.idCapturadanumber).subscribe((data:any) => {
      console.log(data);
      if(data=="-1"){
        console.log("La cita ha sido cancelada");
        this.ngOnInit();
      }
      
      else{
        console.log("Error al cancelar la cita");
        this.ngOnInit();
      }
    });

  }

  public capturar(id:any){
    console.log(id)
    this.idCapturadanumber = id;
    this.carApiService.idReserva = id;
    console.log(id)
    console.log(this.idCapturadanumber);
    
  }

  public prueba(fecha: string, hora: string){
    
    this.carApiService.fechaP = fecha;
    this.carApiService.horaP = hora;
    console.log("arranca la prueba")
    console.log(fecha, hora)
  }

  // Modal citas del taller (Añadir y modificar)

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

  public registrarCliente(nombre: string, apellidos: string, telefono: string, fecha: string, hora: string){
    this.carApiService.registrarCliente(new Usuario(0, null, "1", nombre, apellidos, Number(telefono), null)).subscribe((data:any) =>{
      console.log(data);
      // this.IdclienteNuevo = data;
      if(data!="-1"){
        console.log("Se anadio el cliente: " + data);
        this.AServicios = this.serviciosCitas.toString();
    // console.log(this.IdclienteNuevo)
    this.carApiService.pedirCita(new Cita(this.AServicios, fecha, hora, this.carApiService.tallerLogin.id_taller, data)).subscribe((data: any) => {
      if (data != "-1") {
        console.log(data)
        alert("Error al pedir la cita");
        this.ngOnInit();
      }
      else {
        // this.IdclienteNuevo = null;
        console.log(data)
        alert("Cita reservada con éxito");
        this.ngOnInit();
      }
    })
      }
      else{
        console.log("Error al insertar el cliente")
      }
    })
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
  

  public modificarCita(fecha:any, hora: string){
    this.AServicios = this.serviciosCitas.toString();
    console.log(this.carApiService.idReserva)
    this.carApiService.modificarCita(new Cita(this.AServicios, fecha, hora, 0, 0, this.carApiService.idReserva)).subscribe((data: any) => {
      if (data != "-1") {
        console.log(data)
        console.log("Error al pedir la cita");
        this.ngOnInit();
        
      }
      else {
        console.log(data)
        console.log("Cita reservada con éxito");
        this.ngOnInit();
       
      }
    })
  }

  public calendarioM(){
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

  public calendarioA(){
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
    document.getElementById("fechaA").setAttribute("min", today);
  }

  public mostrarHorasReservadas(){
    this.carApiService.mostrarHoras(this.carApiService.tallerLogin.id_taller).subscribe((data: any[]) => {
      this.carApiService.horasReservadas = data;
      console.log(data)
    })
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
    console.log(this.carApiService.horasReservadas[0].fecha)
    console.log(this.mostrarHoras)
    console.log(this.fechaFiltrada)
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
    console.log(this.carApiService.tallerLogin)

    // this.array()

    this.calendarioM();
    this.calendarioA();

    this.mostrarHorasReservadas();
    
    
  }

}
