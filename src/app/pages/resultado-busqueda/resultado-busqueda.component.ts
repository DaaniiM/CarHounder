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

  public servicios: any[];
  public talleres:Taller[];
  public taller: Taller;


  constructor(private carApiService:CarApiService, private _router: Router) { 
    this.talleres = carApiService.talleres;
    this.taller = carApiService.taller;
  }



  public detallesServicios() {
  
    
    this.carApiService.buscarServicios().subscribe((data:any[]) => {
      this.servicios=data
      
      console.log(this.servicios)
    })

    

  }

  
  public detallesTaller(id:number) {
  
    
    this.carApiService.detallesTaller(id).subscribe((data:any) => {
      this.carApiService.taller=data[0]
      this._router.navigate(['/paginaTaller']);
    })

    

  }
  

  ngOnInit(): void {

    this.detallesServicios()
  }

}
