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

  // public isHidden: boolean;
  // public noHidden: boolean;

  constructor(public apiService:CarApiService,private _router: Router) {
    

    // this.isHidden = true;
    // this.noHidden = false;

   }

   public cerrarSesion(){

    this.apiService.login = undefined;
    this._router.navigate(['']);
   }
  // public mostrarEsconder(){
  //   if(this.isHidden == false){
  //     this.isHidden = true;
  //     this.noHidden = false;
  //   }
  //   else{
  //     this.isHidden = false;
  //     this.noHidden = true;
  //   }
  // }



  ngOnInit(): void {

  console.log(this.apiService.login)

  
  }

}
