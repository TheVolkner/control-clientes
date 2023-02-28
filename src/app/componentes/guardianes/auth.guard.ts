import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginService } from './../servicios/login.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable } from "rxjs";

@Injectable()
export class AuthGuardian implements CanActivate{

constructor(private router:Router,private afAuth:AngularFireAuth){}

//ESTE GUARDIAN SE ENCARGARA DE VALIDAR SI EL USUARIO INICIO SESION O O NO EN EL SISTEMA
//BASADO EN LA EXISTENCIA DEL AUTH,DE SER ASI, LE PERMITE ACCESO A LOS PATHS, SI NO, LO REDIRIGE AL LOGIN
  canActivate(): Observable<boolean> {

    return this.afAuth.authState.pipe(
      map(auth => {
        if(!auth){
          this.router.navigate(['/login']);
          return false;
        } else {
          return true;
        }
      })
    )

  }

}
