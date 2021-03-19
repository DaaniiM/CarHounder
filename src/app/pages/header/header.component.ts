import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isHidden: boolean;
  public noHidden: boolean;

  constructor() {
    

    this.isHidden = true;
    this.noHidden = false;

   }

  public mostrarEsconder(){
    if(this.isHidden == false){
      this.isHidden = true;
      this.noHidden = false;
    }
    else{
      this.isHidden = false;
      this.noHidden = true;
    }
  }



  ngOnInit(): void {
  }

}
