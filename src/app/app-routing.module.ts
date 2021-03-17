import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { ComoFuncionaComponent } from './pages/como-funciona/como-funciona.component';
import { FormularioContactoComponent } from './pages/formulario-contacto/formulario-contacto.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PaginaTallerComponent } from './pages/pagina-taller/pagina-taller.component';
import { PerfilesComponent } from './pages/perfiles/perfiles.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { SobreNosotrosComponent } from './pages/sobre-nosotros/sobre-nosotros.component';

const routes: Routes = [
  {path: "", component: LandingPageComponent},
  {path:"comoFunciona", component: ComoFuncionaComponent},
  {path:"formularioContacto", component: FormularioContactoComponent},
  {path:"paginaTaller", component: PaginaTallerComponent},
  {path:"perfiles", component: PerfilesComponent},
  {path:"servicios", component: ServiciosComponent},
  {path:"sobreNosotros", component: SobreNosotrosComponent},
  {path:"chat", component: ChatComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
