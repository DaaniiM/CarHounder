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
import { PaginaTallerComponent } from './pages/pagina-taller/pagina-taller.component';
import { ModalCitasComponent } from './pages/modal-citas/modal-citas.component';

@NgModule({
  declarations: [
    AppComponent,
    ComoFuncionaComponent,
    FooterComponent,
    ServiciosComponent,
    HeaderComponent,
    FormularioContactoComponent,
    SobreNosotrosComponent,
    PaginaTallerComponent,
    ModalCitasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
