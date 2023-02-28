import { ClienteServicio } from './../servicios/cliente.service';
import { Clientes } from './../modelo/clientes.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit{

   //HACEMOS UN OBJETO DEL TIPO DE LA INTEFAZ CLIENTES, Y CON TWO BINDING ESTARA VINCULADO CON LOS INPUTS DEL FORMULARIO
  //EN LA PLANTILLA HTML
  cliente:Clientes ={
    nombre:'',
    apellido:'',
    email:'',
    saldo:0
  }

  id:string;

constructor(private clienteServicio:ClienteServicio,
  private router:Router,
  private route:ActivatedRoute){}

  ngOnInit(): void {

    //OBTENEMOS EL PARAMETOR DEL QUERY AL PATH DE ESTE COMPONENTE
    //LO ENVIAMOS A GETCLIENTE Y OBTENEMOS EL CLIENTE ESPECIFICADO
     this.id = this.route.snapshot.params['id'];
     this.clienteServicio.getCliente(this.id).subscribe(
       (cliente) => this.cliente = cliente
     );

  }

  //ESTE METODO SE ACTIVA CON EL BOTON DE GUARDAR CLIENTE
  guardar({value,valid}:{value:Clientes,valid:boolean}){

    //VERIFICAMOS LA VALIDEZ DEL FORMULARIO
    if(!valid){
      alert("Por favor llene el formulario correctamente.");
    } else {

      //LE COLOCAMOS EL ID A LOS DATOS, YA QUE ESTOS SON LOS DATOS DEL FORMULARIO, Y NO INCLUYE ID
      value.id = this.id;
      //ENVIAMOS EL CLIENTE A ACTUALIZAR AL SERVICE Y REDIRIGIMOS A HOME AL TERMINAR
      this.clienteServicio.modificarCliente(value);
      this.router.navigate(['/']);
    }
  }

  //ESTE METODO SE ACTIVA CON EL BOTON ELIMINAR CLIENTE
  eliminar(){

    //CONFIRMAMOS LA ELIMINACION DEL DOCUMENTO
     if(confirm("¿Seguro que desea eliminar este cliente?")){

      //LLAMAMOS AL SERVICIO PARA ELIMINAR Y REDIRIGIR A HOME
      this.clienteServicio.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
     }

  }

}

