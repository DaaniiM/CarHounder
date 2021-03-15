import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComoFuncionaComponent } from './pages/como-funciona/como-funciona.component';
import { FooterComponent } from './pages/footer/footer.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { HeaderComponent } from './pages/header/header.component';
import { FormularioContactoComponent } from './pages/formulario-contacto/formulario-contacto.component';
import { SobreNosotrosComponent } from './pages/sobre-nosotros/sobre-nosotros.component';

@NgModule({
  declarations: [
    AppComponent,
    ComoFuncionaComponent,
    FooterComponent,
    ServiciosComponent,
    HeaderComponent,
    FormularioContactoComponent,
<<<<<<< HEAD
    SobreNosotosComponent,
=======
    SobreNosotrosComponent
>>>>>>> f89cffffeb5bbdb129c4db40ec0614e4c2aad14e
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
