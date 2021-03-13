import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComoFuncionaComponent } from './pages/como-funciona/como-funciona.component';
import { FooterComponent } from './pages/footer/footer.component';
import { FormularioContactoComponent } from './pages/formulario-contacto/formulario-contacto.component';

@NgModule({
  declarations: [
    AppComponent,
    ComoFuncionaComponent,
    FooterComponent,
    FormularioContactoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
