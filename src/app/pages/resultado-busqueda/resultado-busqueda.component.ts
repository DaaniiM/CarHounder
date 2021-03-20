import { Component, OnInit } from '@angular/core';
import { Taller } from 'src/app/modules/taller';
import { CarApiService } from '../../shared/car-api.service';
import { Router } from '@angular/router';
import { Servicio } from 'src/app/modules/servicio';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.css']
})
export class ResultadoBusquedaComponent implements OnInit {

  public servicios: Servicio[];
  public talleres:Taller[];


  constructor(private carApiService:CarApiService, private _router: Router) { 
    this.talleres = carApiService.talleres
  }



  public detallesServicios(id:number) {
  
    
    this.carApiService.buscarServicios(Number(id)).subscribe((data:Servicio[]) => {
      this.servicios=data
      
      console.log(this.servicios[0].descripcion)
    })

    

  }

  

  ngOnInit(): void {
  }

}
