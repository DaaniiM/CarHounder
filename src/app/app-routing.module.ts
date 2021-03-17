import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { CitasComponent } from './pages/citas/citas.component';
import { ComoFuncionaComponent } from './pages/como-funciona/como-funciona.component';
import { FormularioContactoComponent } from './pages/formulario-contacto/formulario-contacto.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PaginaTallerComponent } from './pages/pagina-taller/pagina-taller.component';
import { PerfilTallerComponent } from './pages/perfil-taller/perfil-taller.component';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { ResultadoBusquedaComponent } from './pages/resultado-busqueda/resultado-busqueda.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { SobreNosotrosComponent } from './pages/sobre-nosotros/sobre-nosotros.component';

const routes: Routes = [
  {path: "", component: LandingPageComponent},
  {path:"chat", component: ChatComponent},
  {path:"citas", component: CitasComponent},
  {path:"comoFunciona", component: ComoFuncionaComponent},
  {path:"formularioContacto", component: FormularioContactoComponent},
  {path:"paginaTaller", component: PaginaTallerComponent},
  {path:"perfilTaller", component: PerfilTallerComponent},
  {path:"perfilUsuario", component: PerfilUsuarioComponent},
  {path:"resultadoBusqueda", component: ResultadoBusquedaComponent},
  {path:"servicios", component: ServiciosComponent},
  {path:"sobreNosotros", component: SobreNosotrosComponent}
];    

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
