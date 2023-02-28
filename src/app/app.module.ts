import { RegistroGuardian } from './componentes/guardianes/registro.guard';
import { ConfiguracionService } from './componentes/servicios/configuracion.service';
import { AuthGuardian } from './componentes/guardianes/auth.guard';
import { LoginService } from './componentes/servicios/login.service';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { enviroment } from 'src/environments/enviroment';

import {AngularFireModule } from '@angular/fire/compat';
import {AngularFirestoreModule,Settings} from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceroComponent } from './componentes/cabecero/cabecero.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { EditarClienteComponent } from './componentes/editar-cliente/editar-cliente.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { LoginComponent } from './componentes/login/login.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import { ClienteServicio } from './componentes/servicios/cliente.service';

@NgModule({
  declarations: [
    AppComponent,
    CabeceroComponent,
    TableroComponent,
    ClientesComponent,
    EditarClienteComponent,
    RegistroComponent,
    ConfiguracionComponent,
    LoginComponent,
    NoEncontradoComponent,
    PiePaginaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(enviroment.firestore,'control-clientes'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [ClienteServicio,LoginService,AuthGuardian,ConfiguracionService,RegistroGuardian],
  bootstrap: [AppComponent]
})
export class AppModule { }
