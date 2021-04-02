import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../../shared/car-api.service';
import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.min.css'
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-contacto',
  templateUrl: './formulario-contacto.component.html',
  styleUrls: ['./formulario-contacto.component.css']
})
export class FormularioContactoComponent implements OnInit {

  constructor(private apiService: CarApiService, private _router: Router) { }

  public recogerdatos(nombre:string, correo:string, asunto:string, mensaje:string) {
    if(nombre == "" || correo == "" || asunto == "" || mensaje == ""){
      this.pushNotify2();
    }else{
      let json =
      {
        nombre:nombre,
        correo:correo,
        asunto:asunto,
        mensaje:mensaje
      }
      this.apiService.contacto(json).subscribe((data)=>{
    });
    this.pushNotify();
    this._router.navigate(['']);
    }
  } 

public pushNotify() {
  new Notify({
    status: 'success',
    title: '',
    text: 'Mensaje enviado',
    effect: 'fade',
    speed: 300,
    customClass: null,
    customIcon: null,
    showIcon: true,
    showCloseButton: true,
    autoclose: true,
    autotimeout: 2000,
    gap: 70,
    distance: 20,
    type: 1,
    position: 'right top'
  });
}

public pushNotify2() {
  new Notify({
    status: 'error',
    title: '',
    text: 'Debe rellenar todos los campos',
    effect: 'fade',
    speed: 300,
    customClass: null,
    customIcon: null,
    showIcon: true,
    showCloseButton: true,
    autoclose: true,
    autotimeout: 2000,
    gap: 70,
    distance: 20,
    type: 1,
    position: 'right top'
  });
}

  ngOnInit(): void {
  }

}
