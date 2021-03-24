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

  constructor(public carApiService:CarApiService) {

    this.taller = carApiService.taller
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


  ngOnInit(): void {

    this.detallesServicios()

    this.ofertas(this.taller.id_taller)
  
  }

}
