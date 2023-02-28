import { LoginService } from './../servicios/login.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{


  mensaje:string;
  email:string;
  password:string;

  @ViewChild('mensajeError') mensajeError: ElementRef;

  //ACCEDEMOS AL LOGIN SERVICE PARA INICIAR LA SESION
    constructor(private router:Router,
      private loginService:LoginService){}

   //AL CARGAR ESTE COMPONENTE VERIFICAMOS SI HAY UNA SESION ACTIVA, DE HABER, NO HAY NECESIDAD DE ENTRAR AL REGISTRO
   ngOnInit(): void {

    this.loginService.getAuth().subscribe(auth => {
      if(auth){
        this.router.navigate(['/']);
      }
    })
  }

  //LLAMADO AL METODO DESDE BOTON PARA REGISTRAR UN USUARIO
  registro(){

    //ENVIAMOS AL LOGIN SERVICE LOS DATOS PARA REGISTRAR UN USUARIO
    this.loginService.registrarse(this.email,this.password)
    //SI SE REGISTRÓ CORRECTAMENTE, REDIRIGIMOS AL INICIO
    .then(res => {
      this.router.navigate(['/']);
    })
    //SI HUBO UN ERROR, SE LO MOSTRAMOS AL USUARIO
    .catch(error => {
      this.mensaje = error.message;
      this.mostrarMensaje();
    })


  }

    //ESTE METODO SE ENCARGA DE DESPLEGAR UN DIV CON EL MENSAJE DE ERROR SI NO SE PUDO INICIAR SESION
    mostrarMensaje(){

      this.mensajeError.nativeElement.hidden = false;
   }
}
