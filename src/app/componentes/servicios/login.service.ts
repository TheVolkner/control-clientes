import { map } from 'rxjs';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { Injectable, resolveForwardRef } from '@angular/core';

@Injectable()
//ESTE SERVICIO SE ENCARGARA DE COMUNICARSE CON FIRESTORE PARA HACER EL LOGIN
export class LoginService{

  //ACCEDEMOS AL SERVICIO AUTH DE FIRESTORE
  constructor(private authService:AngularFireAuth){}


  //METODO PARA LOGIN QUE RECIBE EMAIL Y PASSWORD DEL CLIENTE
  login(email:string, password:string){
    //EL METODO DE LOGIN DE AUTH SERVICE DEVUELVE UNA PROMESA, DEVOLVEMOS UN OBJETO DE TIPO PROMESA QUE LA RESUELVA
    //EN CASO DE ERROR, TAMBIEN SE DEVUELVE
    return new Promise((resolve, reject) => {
        this.authService.signInWithEmailAndPassword(email, password)
        .then(
          datos => resolve(datos),
          error => reject(error)
        )
    })
}

//OBTENEMOS EL ESTADO DE LA SESION AUTENTICADA
getAuth(){
  //SI HAY UNA SESION EN EL OBJETO AUTH, LA DEVOLVEMOS
  return this.authService.authState.pipe(
    map(auth => auth)
  );
}

//METODO PARA CERRAR SESION
logout(){

  //ESTE METODO ES SUFICIENTE PARA SALIR DEL SISTEMA.
  this.authService.signOut();
}

//METODO PARA REGISTRAR UN USUARIO
registrarse(email:string,password:string){

  //DEVOLVEMOS UNA PROMESA
  return new Promise((resolve,reject) => {
    //CON EL AUTH SERVICE INDICAMOS CREAR UN USER CON EMAIL Y PASSWORD
    this.authService.createUserWithEmailAndPassword(email,password)
    //DEVOLVEMOS LA RESPUESTA
    .then(
      datos => resolve(datos),
      error => reject(error)
    )
  })
}
}
