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
  public idCapturadanumber:number;
  public arrayServicios: string[];
  public arrayIconos: any[];

  constructor(private carApiService:CarApiService, private _router: Router) { 

    this.login = carApiService.login;
    this.fechacita;
    this.idCapturadanumber = null;
  }


  public mostrarCitasCliente() {
    
    this.carApiService.mostrarCitaCliente(this.carApiService.clienteLogin.id_cliente).subscribe((data:any) => {
      console.log(data);
      this.citas = data;
      this.carApiService.citaCliente = data;
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
      this.carApiService.citaTaller = data;
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
      console.log(this.citas.id_taller, this.carApiService.clienteLogin.id_taller)
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

  public detallesServicios() {
    
    this.carApiService.buscarServicios().subscribe((data:any[]) => {
      this.servicios=data
      
      console.log(this.servicios)
    })
  }

  public capturar(id:any){
    console.log(id)
    this.idCapturadanumber = id;
    this.carApiService.idReserva = id;
    console.log(id)
    console.log(this.idCapturadanumber);
    
  }

  // public array(){
  //   for(let i=0; this.citas.length; i++){
  //     this.arrayServicios += this.citas[i].servicios
  //   }
  //   console.log(this.arrayServicios)
  //   this.arrayServicios = this.citas.servicios.split(",")
  //   console.log(this.arrayServicios)
  // }

  public prueba(fecha: string, hora: string){
    
    this.carApiService.fechaP = fecha;
    this.carApiService.horaP = hora;
    console.log("arranca la prueba")
    console.log(fecha, hora)
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
    
    // this.detallesServicios()

    console.log(this.login)
    console.log(this.carApiService.tallerLogin)

    // this.array()

    this._router.navigate(['/citas']);
    
    
  }

}
