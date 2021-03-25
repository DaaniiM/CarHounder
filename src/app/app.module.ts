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
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ModalesComponent } from './pages/modales/modales.component';
import { ChatComponent } from './pages/chat/chat.component';
import { PerfilTallerComponent } from './pages/perfil-taller/perfil-taller.component';
import { CitasComponent } from './pages/citas/citas.component';
import { ResultadoBusquedaComponent } from './pages/resultado-busqueda/resultado-busqueda.component';
import { ModalCitasTallerComponent } from './pages/modal-citas-taller/modal-citas-taller.component';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AlertaComponent } from './pages/alerta/alerta.component';


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
    LandingPageComponent,
    ModalesComponent,
    ChatComponent,
    PerfilTallerComponent,
    CitasComponent,
    ResultadoBusquedaComponent,
    ModalCitasTallerComponent,
    PerfilUsuarioComponent,
    AlertaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
