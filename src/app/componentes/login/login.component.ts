import { LoginService } from '../servicios/login.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  email:string;
  password:string;
  mensaje:string;

@ViewChild('mensajeError') mensajeError: ElementRef;

//ACCEDEMOS AL LOGIN SERVICE PARA INICIAR LA SESION
  constructor(private router:Router,
    private loginService:LoginService){}


  //AL CARGAR ESTE COMPONENTE VERIFICAMOS SI HAY UNA SESION ACTIVA, DE HABER, NO HAY NECESIDAD DE ENTRAR AL LOGIN
  ngOnInit(): void {

    this.loginService.getAuth().subscribe(auth => {
      if(auth){
        this.router.navigate(['/']);
      }
    })
  }


  //INICIAMOS SESION EN FIRESTORE CON ESTE METODO
  //SE COMUNICA CON EL SERVICIO, Y DEVOLVERA UNA PROMESA
  login(){
    this.loginService.login(this.email,this.password)
    //SI LA PROMESA REGRESO UN VALOR, ES DECIR INICIO SESIÓN
    .then(res => {
      this.router.navigate(['/']);
    })
    //SI DEVOLVIÓ ERROR, INDICAMOS QUE NO SE INICIÓ LA SESIÓN GUARDANDO EL MENSAJE EN EL ATRIBUTO Y MOSTRANDO EL ERROR
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
