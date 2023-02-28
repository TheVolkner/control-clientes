import { Configuracion } from './../modelo/configuracion.model';
import { ConfiguracionService } from './../servicios/configuracion.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit{

  //CREAMOS AL ATRIBUTO ASOCIADO AL CHECKBOX DE LA PLANTILLA CON TWO WAY BINDING
  permitirRegistro:boolean;

  //ACCEDEMOS AL SERVICIO DE ROUTING Y AL DE CONFIGURACION
  constructor(private router:Router,private configuracionService: ConfiguracionService){}

  //AL CARGAR EL COMPONENTE, ACCEDEMOS AL SERVICIO DE CONFIGURACION PARA QUE PREGUNTE A LA DATABASE
  //POR EL VALOR DE PERMITIR REGISTRO
  ngOnInit(): void {

    this.configuracionService.getConfiguracion()
    .subscribe((configuracion:Configuracion) => {

      this.permitirRegistro = configuracion.permitirRegistro;
    } )

  }

  //PARA GUARDAR OBTENEMOS EL CAMPO DEL CHECKBOX, CREAMOS UN OBJETO DE LA INTERFAZ CONFIGURACION Y LO ENVIAMOS
  guardar(){

   let configuracion = {permitirRegistro: this.permitirRegistro};

   this.configuracionService.modificarConfiguracion(configuracion);

   this.router.navigate(['/']);
  }
}
