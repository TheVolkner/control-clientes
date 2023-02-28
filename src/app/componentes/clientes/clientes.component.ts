import { NgForm } from '@angular/forms';
import { Clientes } from './../modelo/clientes.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClienteServicio } from '../servicios/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{

  //GENERAMOS UN ARREGLO DONDE SE INICIALIZARAN LOS CLIENTES PROVENIENTES DE CLIENTESERVICIO
  clientes:Clientes[];
  //HACEMOS UN OBJETO DEL TIPO DE LA INTEFAZ CLIENTES, Y CON TWO BINDING ESTARA VINCULADO CON LOS INPUTS DEL FORMULARIO
  //EN LA PLANTILLA HTML
  cliente:Clientes ={
    nombre:'',
    apellido:'',
    email:'',
    saldo:0
  }

  //CON VIEWCHILD ACCEDEMOS A LOS LOCAL REFERENCES DE LA PLANTILLA DEL FORMULARIO Y EL BOTON DE CERRAR
  @ViewChild('clienteForm') clienteForm: NgForm;
  @ViewChild('botonCerrar') botonCerrar: ElementRef;


  //INJECTAMOS EL SERVICIO DE CLIENTES PARA PODER COMUNICARNOS CON FIRESTORE Y LISTAR LA COLECCION
  constructor(private clientesServicio:ClienteServicio){}

  ngOnInit(): void {

    //OBTENEMOS LOS CLIENTES Y RELLENAMOS LOS CLIENTES DE ESTE COMPONENTE
    this.clientesServicio.getClientes().subscribe(
      clientes => {

        this.clientes = clientes;
      }
    )
  }

  //OBTENEMOS EL SALDO TOTAL DE TODOS LOS CLIENTES DEL ARRAY SEGUN SU CAMPO SALDO
  getSaldoTotal(){

    //CREAMOS UNA VARIABLE PARA ACUMULAR EL SALDO
    let saldoTotal:number = 0;

    //RECORREMOS EL ARRAY Y OBTENEMOS LOS SALDOS
    this.clientes.forEach(cliente => {

      saldoTotal += cliente.saldo;

    });

    //RETORNAMOS EL SALDO TOTAL
    return saldoTotal;

  }

  //AGREGAMOS UN NUEVO CLIENTE
  //RECIBIMOS LOS VALORES DEL FORMULARIO Y SI EL FORMULARIO ES VALIDO COMO PARAMETROS
  agregar({value,valid}:{value:Clientes,valid:boolean}){

    //VERIFICAMOS QUE EL FORMULARIO SEA VALIDO
    if(!valid){
      alert('Por favor llena el formulario correctamente');
    } else {
    //SI EL FORMULARIO ES VALIDO, LLAMAMOS A CLIENTE SERVICE Y AGREGAMOS
    //ADEMAS LE INDICAMOS AL FORMULARIO QUE LIMPIE SUS CAMPOS
    //Y AL BOTON DEL MODAL QUE SE CIERRE
      this.clientesServicio.agregarCliente(value);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }


  }


  //ESTE METODO LE INDICA AL BOTON DE LA VENTANA MODAL QUE SE CIERRE AL COMPLETAR SU PROCESO
  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }
}

