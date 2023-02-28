import { Clientes } from './../modelo/clientes.model';
import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { map, Observable } from 'rxjs';

@Injectable()
//ESTA CLASE DE SERVICIO SE ENCARGARA DE GENERAR LA COLECCION, EL DOCUMENTO
//Y LOS DATOS PARA GUARDAR EN FIRESTORE A LA COLECCION CLIENTES
//RECORDANDO QUE TRABAJA CON COLECCIONES Y DOCUMENTOS DE DATOS.
export class ClienteServicio{

  //CREAMOS LA COLECCION
  clientesCollection: AngularFirestoreCollection<Clientes>;

  //CREAMOS EL DOCUMENTO
  clienteDoc: AngularFirestoreDocument<Clientes>;

  //CREAMOS EL ARREGLO DE CLIENTES
  clientes:Observable<Clientes[]>;

  //CREAMOS UN OBJETO CLIENTES
  cliente:Observable<Clientes>;

  //CON EL OBJETO DB ACCEDEMOS A UNA COLECCION DE FIRESTORE, EN ESTE CASO A LA DE CLIENTES
  //Y LA ORDENAMOS POR NOMBRE DE FORMA ASCENDENTE.
  constructor(private db:AngularFirestore){
    this.clientesCollection = db.collection('clientes',ref => ref.orderBy('nombre','asc'));

  }

  //OBTENEMOS CADA CLIENTE DE LA COLECCION
  getClientes(): Observable<Clientes[]>{
    //ITERAMOS CADA CLIENTE DE LA COLECCION CON PIPE
    this.clientes = this.clientesCollection.snapshotChanges().pipe(
      //OBTENEMOS EL DOCUMENTO CON TODOS LOS CLIENTES
      map(cambios => {
        //LEEMOS CADA CLIENTE
        return cambios.map(accion => {
          //OBTENEMOS DE CADA CLIENTE SU DATA Y ACCEDEMOS AL ID, PORQUE EL ID ESTA ASOCIADO AL DOCUMENTO
          //Y LA DATA A LOS CAMPOS.
           const datos = accion.payload.doc.data() as Clientes;
           datos.id = accion.payload.doc.id;
           //LOS RETORNAMOS AL OBSERVABLE DE CLIENTES QUE ESTAMOS RELLENANDO
           return datos;
        })
      })
    );
    //DEVOLVEMOS EL OBSERVABLE CLIENTES
    return this.clientes;
  }

  //AGREGAMOS UN NUEVO CLIENTE A LA COLECCIÓN
  agregarCliente(cliente:Clientes){

    this.clientesCollection.add(cliente);
  }

  //METODO PARA OBTENER UN CLIENTE DE LA COLECCION
  getCliente(id:string){
    //NOS COMUNICAMOS CON EL OBJETO DB AL DOCUMENTO Y SOLICITAMOS EL OBJETO CLIENTE CON EL ID ESPECIFICADO EN LA COLECCION CLIENTES
    this.clienteDoc = this.db.doc<Clientes>(`clientes/${id}`);
    //ITERAMOS EL DOCUMENTO PARA OBTENER SUS DATOS
    this.cliente = this.clienteDoc.snapshotChanges().pipe(
      map(accion => {
        //SI HAY DATOS EN EL DOCUMENTO, LOS GUARDAMOS
        if(accion.payload.exists === false){
          return null;
        } else {
          const datos = accion.payload.data() as Clientes;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.cliente;
  }

  //METODO PARA ACTUALIZAR LOS DATOS DE UN CLIENTE
  modificarCliente(cliente:Clientes){

    //OBTENEMOS EL DOCUMENTO DE ESE CLIENTE DE LA BD SEGUN SU ID
    this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);

    //ACTUALIZAMOS EL CLIENTE CON EL METODO UPDATE
    this.clienteDoc.update(cliente);
  }

  //METODO PARA ELIMINAR UN CLIENTE
  eliminarCliente(cliente:Clientes){

    //OBTENEMOS EL DOCUMENTO DE ESE CLIENTE DE LA BD SEGUN SU ID
    this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
    //ELIMINAMOS EL DOCUMENTO.
    this.clienteDoc.delete();
  }


}
