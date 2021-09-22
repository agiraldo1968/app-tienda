import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UtilidadesService } from '../../servicios/utilidades.service';
import { CarroService } from '../../servicios/carro.service';

@Component({
  selector: 'app-precio',
  templateUrl: './precio.component.html',
  styleUrls: ['./precio.component.scss'],
})
export class PrecioComponent implements OnInit {

  colores: string[] = []
  arrayPrecio: string[] = []
  precioString: string

  @Input() precio:string | number
  @Input() esVertical:boolean = false

  @Output() seleccionar? = new EventEmitter()

  constructor(private utilidades:UtilidadesService,
              private carroService:CarroService) { 
    utilidades.listaColores().subscribe((c:any) => {
        this.colores = c

        this.precioString = this.precio.toString()

        for(let i=0;i<this.precioString.length;i++)
        {
            this.arrayPrecio.push(this.colores.find(p => p['precio'] == this.precioString[i])['color'])
        }
    })
  }

  ngOnInit() 
  {
  }

  seleccionarPrecio(valor:string)
  {
      this.carroService.precioPedido = valor
      this.seleccionar.emit(valor)
  }

  onClick(color: string)
  {
      const numero = this.colores.find(c => c['color'] == color)['precio']

      this.seleccionarPrecio(numero)
  }

}
