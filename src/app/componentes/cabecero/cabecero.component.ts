import { ConfiguracionService } from './../servicios/configuracion.service';
import { Router } from '@angular/router';
import { LoginService } from './../servicios/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit{

  //ATRIBUTOS PARA VERIFICAR SI EL USUARIO ESTA LOGEADO Y CUAL ES SU EMAIL
  isLoggedIn: boolean;
  loggedInUser: string;
  permitirRegistro:boolean;

  constructor(private loginService:LoginService,
    private router:Router,
    private configuracionService:ConfiguracionService){}

  ngOnInit(): void {

    //AL CARGAR ESTE COMPONENTE VERIFICAMOS SI EL USUARIO
    //ESTA LOGEADO LLAMANDO AL LOGIN SERVICE
    this.loginService.getAuth().subscribe(
      auth => {
        //SI EL OBJETO AUTH TIENE UNA SESION, INDICAMOS LA BANDERA EN TRUE Y OBTENEMOS EL EMAIL
        if(auth){
          this.isLoggedIn = true;
          this.loggedInUser = auth.email;
          console.log(this.isLoggedIn);
        } else {
          //SI NO HAY SESION, INDICAMOS LA BANDERA EN FALSE
          this.isLoggedIn = false;
        }
      }
    );

    //COMPROBAMOS SI LA CONFIGURACION PERMITE REGISTRAR USUARIOS SEGUN EL SERVICE
    this.configuracionService.getConfiguracion().subscribe(
     configuracion => {
      //SOLICITAMOS EL VALOR DEL CHECKBOX EN LA BASE DE DATOS, QUE SERA UN OBJETO
      //CONFIGURACION CON EL BOOLEAN DE PERMITIR REGISTRO
      this.permitirRegistro = configuracion.permitirRegistro;

    });

  }

  //METODO QUE SE LLAMA DESDE UNO DE LOS BOTONES DEL HEADER, PARA HACER LOGOUT
  //INVALIDAMOS LA BANDERA Y EL ATRIBUTO QUE MUESTRA EL EMAIL Y NOS VAMOS AL LOGIN
  logout(){
    this.loginService.logout();
    this.isLoggedIn = false;
    this.loggedInUser = "";
    this.router.navigate(['/login']);
  }
}
