import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/modules/cita';
import { Oferta } from 'src/app/modules/oferta';
import { Taller } from 'src/app/modules/taller';
import { CarApiService } from 'src/app/shared/car-api.service';

@Component({
  selector: 'app-pagina-taller',
  templateUrl: './pagina-taller.component.html',
  styleUrls: ['./pagina-taller.component.css']
})
export class PaginaTallerComponent implements OnInit {

  public taller:Taller;
  public servicios: any[];
  public oferta: Oferta;
  public cita: Cita;
  public mostrarHoras: any;
  public horas: any[];

  

  constructor(public carApiService:CarApiService) {

    this.taller = carApiService.taller;
    this.horas = ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
                  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"];
    this.mostrarHoras = [];
   }

   public detallesServicios() {
  
    
    this.carApiService.buscarServicios().subscribe((data:any[]) => {
      this.servicios=data
      
      console.log(this.servicios)
    })

    

  }

  public ofertas(id:number){

    this.carApiService.oferta(id).subscribe((data:any[]) => {
      this.oferta=data[0]
      
      console.log(this.oferta)
    })

  }

  public mostrarHorasReservadas(){
    this.carApiService.mostrarHoras(this.carApiService.taller.id_taller).subscribe((data: any[]) => {
      this.carApiService.horasReservadas = data;
      console.log(data)
    })
  }

  public filtrarHoras(){
    console.log("entra en el método filtrarhoras");
    console.log(this.carApiService.horasReservadas);
    
    for (var i = 0; i < this.horas.length; i++) {
      // we want to know if a[i] is found in b
      var match = false; // we haven't found it yet
      for (var j = 0; j < this.carApiService.horasReservadas.length; j++) {
          if (this.horas[i] == this.carApiService.horasReservadas[j].hora) {
              // we have found a[i] in b, so we can stop searching
              match = true;
              break;
          }
          // if we never find a[i] in b, the for loop will simply end,
          // and match will remain false
      }
      // add a[i] to newArray only if we didn't find a match.
      if (!match) {
          this.mostrarHoras.push(this.horas[i]);
      }
  }
    console.log(this.mostrarHoras);
  }


  ngOnInit(): void {

    this.detallesServicios()

    this.ofertas(this.taller.id_taller)

    this.mostrarHorasReservadas();
  
  }

}
