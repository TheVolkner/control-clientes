import { RegistroGuardian } from './componentes/guardianes/registro.guard';
import { CanActivate } from '@angular/router';
import { AuthGuardian } from './componentes/guardianes/auth.guard';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { EditarClienteComponent } from './componentes/editar-cliente/editar-cliente.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',component: TableroComponent, canActivate:[AuthGuardian]},
  {path:'login',component:LoginComponent},
  {path:'registrarse',component:RegistroComponent ,canActivate:[RegistroGuardian]},
  {path:'configuracion',component:ConfiguracionComponent, canActivate:[AuthGuardian]},
  {path:'cliente/editar/:id',component:EditarClienteComponent, canActivate:[AuthGuardian]},
  {path:'**',component:NoEncontradoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
