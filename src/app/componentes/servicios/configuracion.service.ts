import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Configuracion } from './../modelo/configuracion.model';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable()
//ESTA CLASE DE SERVICIO SE ENCARGARA DE GENERAR LA COLECCION, EL DOCUMENTO
//Y LOS DATOS PARA GUARDAR EN FIRESTORE A LA COLECCION CONFIGURACION
// RECORDANDO QUE TRABAJA CON COLECCIONES Y DOCUMENTOS DE DATOS.
export class ConfiguracionService{

  //CREAMOS EL DOCUMENTO
  configuracionDoc:AngularFirestoreDocument<Configuracion>;

  //CREAMOS EL OBSERVABLE DE CONFIGURACION
  configuracion: Observable<Configuracion>;

  //ID unico de la coleccion de configuracion
  id="1";

  constructor(private db:AngularFirestore){}

  //METODO PARA OBTENER EL DOC DE CONFIGURACION DE FIRESTORE
  getConfiguracion():Observable<Configuracion>{

    //OBTENEMOS EL DOC ASOCIADO CON EL PATH DE CONFIGURACION Y SU ID
    this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
    //OBTENEMOS LOS CAMPOS
    this.configuracion = this.configuracionDoc.valueChanges();
    //RETORNAMOS
    return this.configuracion;
  }

  //METODO PARA ACTUALIZAR LA CONFIGURACION
  modificarConfiguracion(configuracion:Configuracion){

    //OBTENEMOS EL DOC ASOCIADO CON EL PATH DE CONFIGURACION Y SU ID
    this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);

    //ACTUALIZAMOS LA CONFIGURACION ENVIANDO EL NUEVO OBJETO A FIRESTORE
    this.configuracionDoc.update(configuracion);
  }

}
