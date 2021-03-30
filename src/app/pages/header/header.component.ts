import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/modules/login';
import { CarApiService } from 'src/app/shared/car-api.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public apiService:CarApiService,private _router: Router) {

   }

   public cerrarSesion(){

    this.apiService.login = undefined;
    this._router.navigate(['']);
   }
  
  ngOnInit(): void {

  }

}
