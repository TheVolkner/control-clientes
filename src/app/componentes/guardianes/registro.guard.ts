import { ConfiguracionService } from './../servicios/configuracion.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from "@angular/core";
import { Observable, map } from 'rxjs';

@Injectable()
//ESTE GUARDIAN COMPRUEBA QUE SE PUEDAN REGISTRAR USUARIOS EN FIRESTORE SEGUN LA CONFIGURACION
export class RegistroGuardian implements CanActivate{

 //INJECTAMOS A CONFIGURACION SERVICE Y EL ROUTING
 constructor(private configuracionService:ConfiguracionService,
  private router:Router){}

  //COMPROBAMOS SI LA CONFIGURACION PERMITE AGREGAR USUARIOS
  canActivate():Observable<boolean> {

    //RETORNAMOS LA RESPUESTA YA SEA TRUE O FALSE
    return this.configuracionService.getConfiguracion()
    .pipe(
      map(configuracion => {

        if(configuracion.permitirRegistro){
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    )


  }


}
