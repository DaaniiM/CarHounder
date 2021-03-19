import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../../shared/car-api.service';
import { Taller } from '../../modules/taller';
import { Router } from '@angular/router'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  public talleres:Taller[];

  constructor(public carApiService:CarApiService, private _router: Router) { }



  public conseguirTalleres(cp:string) {
    
    this.carApiService.buscarTalleres(Number(cp)).subscribe((data:Taller[]) => {
      this.talleres=data
      this.carApiService.talleres = this.talleres;
      this._router.navigate(['/resultadoBusqueda']);

    })

  }


  ngOnInit(): void {
  }

}
