import { Component, OnInit } from '@angular/core';
import { Taller } from 'src/app/modules/taller';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { CarApiService } from '../../shared/car-api.service';

@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.css']
})
export class ResultadoBusquedaComponent implements OnInit {

  public talleres:Taller[];


  constructor(private carapi:CarApiService) { 
    this.talleres = carapi.talleres
  }

  

  ngOnInit(): void {
  }

}
