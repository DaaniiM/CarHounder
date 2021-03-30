import { Component, OnInit } from '@angular/core';
import { CarApiService } from '../../shared/car-api.service';
import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.min.css'

@Component({
  selector: 'app-formulario-contacto',
  templateUrl: './formulario-contacto.component.html',
  styleUrls: ['./formulario-contacto.component.css']
})
export class FormularioContactoComponent implements OnInit {
  public alert1:boolean=true

  constructor(private apiService: CarApiService) { }


  public recogerdatos(nombre:string, correo:string, asunto:string, mensaje:string) {
    let json =
      {
        nombre:nombre,
        correo:correo,
        asunto:asunto,
        mensaje:mensaje
        
      }
      this.apiService.contacto(json).subscribe((data)=>{
        console.log(data);
      })
      this.alert1=false;



  } 

//   // Con esta función se muestra el Toast 
//   public mostrarToast() {
//     let toast = document.getElementById("mitoast");
//     toast.className = "mostrar";
//     setTimeout(function(){ toast.className = toast.className.replace("mostrar", ""); }, 5000);
    
    
// }

public pushNotify() {
  new Notify({
    status: 'success',
    title: '',
    text: 'Mensaje enviado.',
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
  })
}





  ngOnInit(): void {
  }

}
