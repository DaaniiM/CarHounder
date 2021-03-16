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
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ModalesComponent } from './pages/modales/modales.component';
import { ChatComponent } from './pages/chat/chat.component';
import { PerfilesComponent } from './pages/perfiles/perfiles.component';
import { CitasComponent } from './pages/citas/citas.component';

@NgModule({
  declarations: [
    AppComponent,
    ComoFuncionaComponent,
    FooterComponent,
    ServiciosComponent,
    HeaderComponent,
    FormularioContactoComponent,
    SobreNosotrosComponent,
    LandingPageComponent,
    ModalesComponent,
    ChatComponent,
    PerfilesComponent,
    CitasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
